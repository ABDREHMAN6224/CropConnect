import nodemailer from 'nodemailer';


class Email{
    constructor(user){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.from = `Crop Connect <${process.env.EMAIL_FROM}>`;
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
        await this.send('Welcome to the Crop Connect!', 'Thank you for joining us!');
    }

    async sendPasswordReset(){
        const frontendURL = process.env.FRONTEND_URL;
        const resetURL = `${frontendURL}`
        await this.send('Your password reset token (valid for 10 minutes)', resetURL);
    }

    async sendContactUs(){
        await this.send('Contact Us', 'Thank you for contacting us. We will get back to you soon.');
    }
    async sendOrderConfirmation(){
        await this.send('Order Confirmation', 'Thank you for ordering from Crop Connect. Your order has been confirmed.');
    }
    async sendOrderShipped(){
        await this.send('Order Shipped', 'Your order has been shipped. Keep an eye out for it.\n You can track your order at any time by visiting the website and logging into your account.');
    }
    async sendOrderDelivered(){
        await this.send('Order Delivered', 'Your order has been delivered. We hope you enjoy your purchase.');
    }
    async sendBlogVerified(title){
        await this.send('Blog Verified', `Your blog titled ${title} has been verified. It is now live on the website.`);
    }
    async sendBlogRejected(title){
        await this.send('Blog Rejected', `Your blog titled ${title} has been rejected. Please write a better blog next time.`);
    }
    async sendFeedback(){
        await this.send('Feedback', 'Thank you for your feedback. We appreciate your time and effort.');
    }
}

export default Email;
