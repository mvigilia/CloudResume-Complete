import json
import boto3

def lambda_handler(event, context):
    # Initialize SNS client
    sns_client = boto3.client('sns')
    
    # Get the SNS Topic ARN (replace with your own ARN)
    sns_topic_arn = 'arn:aws:sns:ap-southeast-2:590183899499:Cloudres-Email'
    
    # Parse the DynamoDB event to extract the relevant data
    for record in event['Records']:
        # Here you can extract data based on the DynamoDB event format
        new_image = record['dynamodb']['NewImage']
        # Convert the DynamoDB format into a readable dictionary
        item_data = {k: list(v.values())[0] for k, v in new_image.items()}
        
        # Convert the dictionary to a string (or customize the message as needed)
        message = f"New item inserted into DynamoDB: {json.dumps(item_data, indent=2)}"
        
        # Publish the message to the SNS topic
        sns_client.publish(
            TopicArn=sns_topic_arn,
            Message=message,
            Subject='Feedback from your Cloud Resume'
        )
    
    return {
        'statusCode': 200,
        'body': json.dumps('SNS notification sent successfully.')
    }
