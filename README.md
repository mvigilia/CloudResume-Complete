# Cloud Resume Project

This project is a cloud-based resume hosted on AWS, demonstrating the use of various AWS services to build scalable and serverless web applications. The resume website leverages **Amazon Route 53**, **AWS Lambda**, **Amazon API Gateway**, **Amazon DynamoDB**, **Amazon SNS**, **AWS Certificate Manager (ACM)**, and **Amazon S3**.

## Architecture Overview

The architecture utilizes the following AWS services:

1. **Amazon Route 53**:  
   Manages the DNS (Domain Name System) for the website, allowing traffic to be routed to the S3 bucket where the static website is hosted. It also enables the use of a custom domain name for your resume (e.g., `myresumepage.com`).

2. **AWS Lambda**:  
   A serverless compute service that handles the logic for dynamic actions, such as processing form submissions. Lambda functions are triggered by API Gateway and run backend code in response to HTTP requests.

3. **Amazon API Gateway**:  
   Exposes RESTful APIs that link the frontend (static website) with the backend services. It routes HTTP requests to AWS Lambda functions and handles various API management tasks such as security and rate limiting.

4. **Amazon DynamoDB**:  
   A fully managed NoSQL database that stores form submissions (e.g., name, email, message) in a scalable and low-latency manner. It ensures data persistence and fast access for form data.

5. **Amazon SNS (Simple Notification Service)**:  
   Sends notifications, such as email alerts, when the contact form is submitted. SNS integrates with Lambda and allows for real-time notifications to be sent to your email or other endpoints.

6. **AWS Certificate Manager (ACM)**:  
   Provides and manages SSL/TLS certificates for securing the website with HTTPS. ACM makes it easy to configure SSL for your domain and automatically renews the certificates to ensure secure communication.

7. **Amazon S3 (Simple Storage Service)**:  
   Hosts the static website files (HTML, CSS, JavaScript) and serves them publicly. The S3 bucket is configured for static website hosting and serves as the front-end of the cloud resume.

## Steps to Build the Cloud Resume

Follow the steps below to deploy your cloud resume with AWS services:

### 1. **Set Up Route 53 for Domain Management**

- Register a domain name using [Amazon Route 53](https://aws.amazon.com/route53/).
- Create a hosted zone for your domain to manage DNS settings.
- Configure DNS settings to point to the S3 bucket where your resume website is hosted.

### 2. **Create an S3 Bucket for Hosting Static Website**

- Create a new S3 bucket in the AWS Console.
- Enable static website hosting on the bucket.
- Upload the HTML, CSS, JavaScript, and any images or other files for your resume.

### 3. **Request SSL/TLS Certificate with ACM**

- Use [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) to request an SSL/TLS certificate for your domain.
- Validate the certificate using DNS validation, and then link the certificate to your custom domain in Route 53.

### 4. **Set Up API Gateway for Backend API**

- Create a REST API in [Amazon API Gateway](https://aws.amazon.com/api-gateway/).
- Set up endpoints (such as `POST /submit-form`) to handle the contact form submissions.
- Integrate API Gateway with AWS Lambda for backend processing.

### 5. **Create a Lambda Function for Contact Form Processing**

- Write a Lambda function to handle form submissions:
  - Parse the form data (name, email, message).
  - Store the data in DynamoDB for persistence.
  - Trigger an SNS notification to send an email alert about the submission.
- Set appropriate IAM roles and permissions for Lambda to interact with DynamoDB and SNS.

### 6. **Configure DynamoDB for Form Submissions**

- Create a DynamoDB table to store the contact form submissions.
  - Include attributes such as `name`, `email`, and `message`.
- Set the table’s read/write capacity or enable on-demand mode for scalability.

### 7. **Set Up SNS for Email Notifications**

- Create an SNS topic to send email notifications for new form submissions.
- Subscribe to the SNS topic with your email address to receive notifications.

### 8. **Test the Contact Form**

- After everything is set up, visit your resume website and submit the contact form.
- Verify that:
  - The form data is stored in DynamoDB.
  - You receive an email notification via SNS.
  - The Lambda function processes the request correctly.

## Tech Stack

- **Amazon Route 53**: DNS and domain management.
- **AWS Lambda**: Serverless backend processing.
- **Amazon API Gateway**: API management and routing.
- **Amazon DynamoDB**: NoSQL database for storing form submissions.
- **Amazon SNS**: Real-time messaging and notifications.
- **AWS Certificate Manager (ACM)**: SSL/TLS certificate management for secure HTTPS.
- **Amazon S3**: Static website hosting.

## Requirements

- An AWS account.
- Basic knowledge of AWS services and the AWS Management Console.
- A custom domain name (optional but recommended).

---

This README provides a comprehensive guide for deploying a serverless, scalable cloud resume using AWS services. It highlights the key AWS components involved in hosting, processing, and notifying, while emphasizing the simplicity and scalability of serverless architecture.

