//Contact form validation with jQuery
$(document).ready(() => {
    const contactForm = $("#contact");
    contactForm.validate({
        debug: true,
        errorClass: "alert alert-danger",
        ErrorLabelContainer: "#output-area",
        errElement: "div",
        // rules here define what is good or bad input
        //each rule starts with the form input element's NAME attribute
        rules: {
            name: {
                required: true
            },
            emailAddress: {
                email: true,
                required: true
            },
            message: {
                required: true,
                maxlength: 2000
            },
        },
        messages: {
            name: {
                required: "Name is a required field."
            },
            emailAddress: {
                email: "Please provide a valid email address.",
                required: "Email is a required field."
            },
            message: {
                required: "Message is a required field.",
                maxlength: "Message is too long."
            }
        },
        submitHandler: (form) => {
            contactForm.ajaxSubmit({
                type: "POST",
                url: $("#contact").attr('action'),
                success: (ajaxOutput) => {
                    const outputArea = $("#output-area")
                    outputArea.css("display","")
                    outputArea.html(ajaxOutput)
                    if($(".alert-success") >= 1) {
                        $("#contact")[0].reset()
                    }
                }
            })
        }
    })
});