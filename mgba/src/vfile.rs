trait VFileOps
where
    Self: std::io::Read + std::io::Write + std::io::Seek,
{
    fn resize(&mut self, size: u64) -> Result<(), std::io::Error>;
    fn sync_data(&self) -> Result<(), std::io::Error>;
}

impl VFileOps for std::fs::File {
    fn resize(&mut self, size: u64) -> Result<(), std::io::Error> {
        std::fs::File::set_len(self, size)
    }

    fn sync_data(&self) -> Result<(), std::io::Error> {
        std::fs::File::sync_data(self)
    }
}

impl VFileOps for std::io::Cursor<Vec<u8>> {
    fn resize(&mut self, size: u64) -> Result<(), std::io::Error> {
        self.get_mut().resize(size as usize, 0);
        Ok(())
    }

    fn sync_data(&self) -> Result<(), std::io::Error> {
        Ok(())
    }
}

#[repr(C)]
pub struct VFile {
    vfile: mgba_sys::VFile,
    f: Box<dyn VFileOps>,
}

unsafe extern "C" fn vfile_close(vf: *mut mgba_sys::VFile) -> bool {
    drop(Box::from_raw(vf as *mut VFile));
    true
}

unsafe extern "C" fn vfile_seek(
    vf: *mut mgba_sys::VFile,
    offset: mgba_sys::off_t,
    whence: ::std::os::raw::c_int,
) -> mgba_sys::off_t {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    f.seek(match whence as u32 {
        mgba_sys::SEEK_SET => std::io::SeekFrom::Start(offset as u64),
        mgba_sys::SEEK_CUR => std::io::SeekFrom::Current(offset),
        mgba_sys::SEEK_END => std::io::SeekFrom::End(offset),
        _ => {
            return -1;
        }
    })
    .map(|v| v as mgba_sys::off_t)
    .unwrap_or(-1)
}

unsafe extern "C" fn vfile_read(vf: *mut mgba_sys::VFile, buffer: *mut ::std::os::raw::c_void, size: usize) -> isize {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    f.read(std::slice::from_raw_parts_mut(buffer as *mut u8, size))
        .map(|v| v as isize)
        .unwrap_or(-1)
}

unsafe extern "C" fn vfile_write(
    vf: *mut mgba_sys::VFile,
    buffer: *const ::std::os::raw::c_void,
    size: usize,
) -> isize {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    f.write(std::slice::from_raw_parts(buffer as *mut u8, size))
        .map(|v| v as isize)
        .unwrap_or(-1)
}

unsafe extern "C" fn vfile_map(
    vf: *mut mgba_sys::VFile,
    size: usize,
    _flags: ::std::os::raw::c_int,
) -> *mut ::std::os::raw::c_void {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    let pos = f.stream_position().unwrap();
    assert!(f.seek(std::io::SeekFrom::Start(0)).is_ok());
    let mut buf = vec![0u8; size];
    if f.read_exact(&mut buf).is_err() {
        assert!(f.seek(std::io::SeekFrom::Start(pos)).is_ok());
        return std::ptr::null_mut();
    }
    assert!(f.seek(std::io::SeekFrom::Start(pos)).is_ok());
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr as *mut _
}

unsafe extern "C" fn vfile_unmap(vf: *mut mgba_sys::VFile, memory: *mut ::std::os::raw::c_void, size: usize) {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    let pos = f.stream_position().unwrap();
    assert!(f.seek(std::io::SeekFrom::Start(0)).is_ok());
    let buf = Vec::from_raw_parts(memory as *mut u8, size, size);
    assert!(f.write_all(&buf).is_ok());
    assert!(f.seek(std::io::SeekFrom::Start(pos)).is_ok());
}

unsafe extern "C" fn vfile_truncate(vf: *mut mgba_sys::VFile, size: usize) {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    let _ = f.resize(size as _);
}

unsafe extern "C" fn vfile_size(vf: *mut mgba_sys::VFile) -> isize {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    let pos = f.stream_position().unwrap();
    let len = f.seek(std::io::SeekFrom::End(0)).unwrap();
    assert!(f.seek(std::io::SeekFrom::Start(pos)).is_ok());
    len as isize
}

unsafe extern "C" fn vfile_sync(vf: *mut mgba_sys::VFile, _buffer: *mut ::std::os::raw::c_void, _size: usize) -> bool {
    let f = (vf as *mut VFile).as_mut().unwrap().f.as_mut();
    f.sync_data().is_ok()
}

const VFILE_OPS: mgba_sys::VFile = mgba_sys::VFile {
    close: Some(vfile_close as _),
    seek: Some(vfile_seek as _),
    read: Some(vfile_read as _),
    readline: Some(mgba_sys::VFileReadline),
    write: Some(vfile_write as _),
    map: Some(vfile_map as _),
    unmap: Some(vfile_unmap as _),
    truncate: Some(vfile_truncate as _),
    size: Some(vfile_size as _),
    sync: Some(vfile_sync as _),
};

impl VFile {
    pub fn from_file(f: std::fs::File) -> Self {
        Self {
            vfile: VFILE_OPS,
            f: Box::new(f),
        }
    }

    pub fn from_vec(v: Vec<u8>) -> Self {
        Self {
            vfile: VFILE_OPS,
            f: Box::new(std::io::Cursor::new(v)),
        }
    }

    pub(super) fn into_raw(self) -> *mut mgba_sys::VFile {
        Box::into_raw(Box::new(self)) as *mut _ as *mut mgba_sys::VFile
    }
}
