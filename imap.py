import imaplib
import email
import json
from email.header import decode_header

# connect to the server
imap = imaplib.IMAP4_SSL("imap.gmail.com")

# login
imap.login("winnersofcerebralbeach@gmail.com", "tcme bqoj uort hwis")

# select the mailbox
imap.select("inbox")

# search for unread emails
status, messages = imap.search(None, 'UNSEEN')

# list of email IDs
email_ids = messages[0].split()

# list to hold email data
emails_data = []

# Process all unread emails
for email_id in email_ids:
    res, msg = imap.fetch(email_id, "(RFC822)")
    for response_part in msg:
        if isinstance(response_part, tuple):
            msg = email.message_from_bytes(response_part[1])
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else 'utf-8')

            # Get the sender's email address
            from_ = msg.get("From")

            # Get the date of the email
            date_ = msg.get("Date")

            # Initialize variable for email content
            content = ""

            # If the email is multipart
            if msg.is_multipart():
                # iterate over email parts
                for part in msg.walk():
                    # if the part is text/plain or text/html, extract it
                    if part.get_content_type() == "text/plain":
                        content = part.get_payload(decode=True).decode('utf-8')
                        break  # prioritize plain text over HTML
                    elif part.get_content_type() == "text/html" and not content:
                        content = part.get_payload(decode=True).decode('utf-8')
            else:
                # if the email is not multipart, the content is in the payload
                content = msg.get_payload(decode=True).decode('utf-8')

            # Add email data to the list
            emails_data.append({
                "subject": subject,
                "from": from_,
                "date": date_,
                "content": content
            })

# close the connection
imap.logout()

# Convert emails data to JSON
emails_json = json.dumps(emails_data, indent=4)

# Output JSON
print(emails_json)