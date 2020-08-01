/* 消息提示工具 */
const message = {
  showSuccessMsg: (obj,msg,timeout) =>{
    obj.$message({
      message: msg,
      center: true,
      type: 'success',
      duration:timeout?timeout:3000,
    });
  },
  showErrMsg: (obj,msg,timeout) =>{
    obj.$message({
      message: msg,
      center: true,
      type: 'error',
      duration:timeout?timeout:3000,
    });
  },
  showWarningMsg: (obj,msg,timeout) =>{
    obj.$message({
      message: msg,
      center: true,
      type: 'warning',
      duration:timeout?timeout:3000,
    });
  }
};
export default message
