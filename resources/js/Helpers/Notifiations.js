class Notifications {
    success()
    {
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Successfully Done!',
            timeout:2000,
        }).show();

    };
    alert()
    {
        new Noty({
            type: 'alert',
            layout: 'topRight',
            text: 'Are you sure?!',
            timeout:1000,
        }).show();

    };
    error()
    {
        new Noty({
            type: 'warning',
            layout: 'topRight',
            text: 'Something went wrong?!',
            timeout:2000,
        }).show();
    };
    warning()
    {
        new Noty({
            type: 'warning',
            layout: 'topRight',
            text: 'Oops Wrong!',
            timeout:1000,
        }).show();
    };
    Image_validation()
    {
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Uploaded image big than 2MB!',
            timeout:2000,
        }).show();
    };
    FileValidationWithMessage(message)
    {
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: message,
            timeout:200,
        }).show();
    };
    exist()
    {
        new Noty({
            type: 'warning',
            layout: 'topRight',
            text: 'This Item is exist',
            timeout:2000,
        }).show();
    };
    successWithMessage(message){
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: message,
            timeout:2000,
        }).show();
    };
    errorWithMessage(message){
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: message,
            timeout:2000,
        }).show();
    };
    warningWithMessage(message){
        new Noty({
            type: 'warning',
            layout: 'topRight',
            text: message,
            timeout:2000,
        }).show();
    };



}
export default Notifications = new Notifications();
