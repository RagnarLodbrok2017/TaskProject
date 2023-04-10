class SwalHelper {
    success()
    {
        Swal.fire({
            title: 'success!',
            text: 'Successfully Done!',
            icon: 'success',
            timer:1000,
            timerProgressBar: true,
            willClose:true,
            showCloseButton:false,
            showCancelButton: false,
            toast:true,
        })

    };
    alert()
    {
       Swal.fire({
           title: 'alert!',
            icon: 'alert',
            text: 'Are you sure?!',
            timer:1000,
           timerProgressBar: true,
        });

    };
    error()
    {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Ok',
            timer:1000,
            timerProgressBar: true,
        })
    };
    warning()
    {
       Swal.fire({
            icon: 'warning',
            title: 'warning',
            text: 'Oops Wrong!',
            timer:2000,
           timerProgressBar: true,
        });
    };
    Image_validation()
    {
       Swal.fire({
           icon: 'error',
           title: 'error',
            text: 'Uploaded image big than 2MB!',
            timer:2000,
           timerProgressBar: true,
        });
    };
    exist()
    {
       Swal.fire({
            icon: 'warning',
           title: 'warning',
            text: 'This Item is exist',
            timer:2000,
           timerProgressBar: true,
        });
    };
    successWithMessage(message){
       Swal.fire({
            icon: 'success',
           title: 'success',
            text: message,
            timer:2000,
           timerProgressBar: true,
        });
    };
    errorWithMessage(message){
       Swal.fire({
            icon: 'error',
           title: 'error',
            text: message,
            timer:2000,
           timerProgressBar: true,
        });
    };
    warningWithMessage(message){
       Swal.fire({
            icon: 'warning',
           title: 'warning',
            text: message,
            timer:2000,
           timerProgressBar: true,
        });
    };
    successWithTitleAndMessage(title ,message){
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            timer:2000,
            timerProgressBar: true,
        });
    };
    errorWithTitleAndMessage(title ,message){
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            timer:2000,
            timerProgressBar: true,
        });
    };
    warningWithTitleAndMessage(title,message){
        Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            timer:2000,
            timerProgressBar: true,
        });
    };



}
export default SwalHelper = new SwalHelper();
