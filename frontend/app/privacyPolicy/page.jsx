import React from 'react'
import NavBar from '../../components/NavBar'
import { FooterSection } from '../../components'

const page = () => {
  return (
    <>
    <NavBar/>
    <div class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4 text-primary-900">Privacy Policy</h1>

        <p class="mb-4">
            This privacy policy sets out how our website uses and protects any information that you give us when you use
            this
            website.
        </p>

        <h2 class="text-2xl font-bold text-primary-600 mb-2">Information We Collect</h2>

        <p class="mb-4">
            We may collect the following information:
        </p>

        <ul class="list-disc list-inside mb-4">
            <li>Your name and contact information</li>
            <li>Demographic information</li>
            <li>Other information relevant to customer surveys and/or offers</li>
        </ul>

        <h2 class="text-2xl font-bold text-primary-600 mb-2">How We Use the Information</h2>

        <p class="mb-4">
            We require this information to understand your needs and provide you with a better service, and in
            particular
            for
            the following reasons:
        </p>

        <ul class="list-disc list-inside mb-4">
            <li>Internal record keeping</li>
            <li>Improving our products and services</li>
            <li>Sending promotional emails about new products, special offers, or other information which we think you
                may
                find
                interesting</li>
            <li>From time to time, we may also use your information to contact you for market research purposes. We may
                contact
                you by email, phone, or mail. We may use the information to customize the website according to your
                interests.</li>
        </ul>

        <h2 class="text-2xl font-bold text-primary-600 mb-2">Security</h2>

        <p class="mb-4">
            We are committed to ensuring that your information is secure. In order to prevent unauthorized access or
            disclosure,
            we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the
            information we collect online.
        </p>

        <h2 class="text-2xl font-bold text-primary-600 mb-2">Controlling Your Personal Information</h2>

        <p class="mb-4">
            You may choose to restrict the collection or use of your personal information in the following ways:
        </p>

        <ul class="list-disc list-inside mb-4">
            <li>If you have previously agreed to us using your personal information for direct marketing purposes, you
                may
                change your mind at any time by writing to or emailing us at [email protected]</li>
            <li>We will not sell, distribute, or lease your personal information to third parties unless we have your
                permission
                or are required by law to do so. We may use your personal information to send you promotional
                information
                about
                third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
            <li>You may request details of personal information which we hold about you. If you would like a copy of the
                information held on you, please write to Crop Connect or email &nbsp;
                <a class="text-primary-900 cursor-pointer"
                    href='mailto:memonabdulrehman250@gmail.com'
                >
                    memonabdulrehman250@gmail.com
                </a>
                    
                </li>
            <li>If you believe that any information we are holding on you is incorrect or incomplete, please write to or
                email
                us as soon as possible at the above address. We will promptly correct any information found to be
                incorrect.
            </li>
        </ul>

        <p class="mb-4 text-primary-600">
            This privacy policy may change from time to time. You should check this page from time to time to ensure that you
            are happy with any changes.
        </p>
    </div>
</div>
<FooterSection/>
</>
  )
}

export default page
