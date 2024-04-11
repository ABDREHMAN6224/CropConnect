import nodemailer from 'nodemailer';


class Email{
    constructor(user){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.from = `Harvest Hub <${process.env.EMAIL_FROM}>`;
    }

    newTransport(){
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "memonabdulrehman250@gmail.com",
                pass: "nnqy cbkv sdhb apat"
            }

        });
    }

    async send(subject, message){
        // 1) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: message          
        };

        // 2) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome(){
        await this.send('Welcome to the Harvest Hub!');
    }

    async sendPasswordReset(){
        const frontendURL = process.env.FRONTEND_URL;
        const resetURL = `${frontendURL}`
        await this.send('Your password reset token (valid for 10 minutes)', resetURL);
    }

    async sendContactUs(){
        await this.send('Contact Us', 'Thank you for contacting us. We will get back to you soon.');
    }

}

export default Email;
