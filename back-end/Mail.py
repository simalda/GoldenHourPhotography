import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from Order import *

class Mail():
    def __init__(self):
         self.sender = ''         
         self.password = ''

    def send_mail(self, order):
        self.recipient = [order.email ]
        print(order.email)
        me = self.sender
        you = self.recipient
        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Golden Hour Photography"
        # msg['From'] = me 
        # msg['To'] = 'simalda83@gmail.com'
        # password = self.password

        # Create the body of the message (a plain-text and an HTML version).
        text = "Hi!\nHow are you?"
        email_content_head = """
        <html>
        <head>
            
        <title>Golden Hour Photography</title>
        <style type="text/css">
            a {color: #d80a3e;}
        body, #header h1, #header h2, p {margin: 0; padding: 0;} 
        #main {border: 1px solid #cfcece;}
        #content-3 {font-size:20px;      border-collapse: separate;
                border-spacing: 0px 10px;}
        #top-message p, #bottom p {color: #3f4042; font-size: 20px; font-family: Arial, Helvetica, sans-serif; }
        #header h1 {color: #ffffff !important; font-family: "Lucida Grande", sans-serif; font-size: 24px; margin-bottom: 0!important; padding-bottom: 0; }
        #header p {color: #ffffff !important; font-family: "Lucida Grande", "Lucida Sans", "Lucida Sans Unicode", sans-serif; font-size: 12px;  }
        h5 {margin: 0 0 0.8em 0;}
            h5 {font-size: 18px; color: #444444 !important; font-family: Arial, Helvetica, sans-serif; }
        p {font-size: 12px; color: #444444 !important; font-family: "Lucida Grande", "Lucida Sans", "Lucida Sans Unicode", sans-serif; line-height: 1.5;}
        #item {padding:5px;text-align:right;margin:15px;}
        </style>
        
        </head>
        """

        email_content = email_content_head + f"""
        <body>
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="f1dddc"><tr><td>
        <table id="top-message" cellpadding="20" cellspacing="0" width="600" align="center">
            <tr>
            <td align="center"  >
                <p>ההזמנה נשמרה בהצלחה. לשאלות נא לפנות לטלפון: 052-4550656</p>
            </td>
            </tr>
        </table>
        

        <table id="main" width="600" align="center" cellpadding="0" cellspacing="15" bgcolor="ffffff">
            <tr>
            <td>
                <table id="header" cellpadding="10" cellspacing="0" align="center" bgcolor="62909a">
                <tr>
                    <td colspan="2" width="570" align="center"  bgcolor="#62909a"><h1>פרטי הזמנה</h1></td> 
                </tr>
            
                </table>
            </td>
            </tr>
        
            <tr>
            <td>
                <table id="content-3" cellpadding="0" cellspacing="0" align="center" cellspacing="15" >
                <tr>
                    <td width="250" valign="top" bgcolor="d0d0d0"  id="item">      
                     {order.date} 
                    </td>
                    <td width="15"></td>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                        תאריך
                    </td>
                </tr>
                        
                <tr>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                    {order.time}
                    </td>
                    <td width="15"></td>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                        שעה
                    </td>
                </tr>
                    <tr>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                    {order.location}
                    </td>
                    <td width="15"></td>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                        מיקום
                    </td>
                </tr>
                 <tr>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                    {order.note}
                    </td>
                    <td width="15"></td>
                    <td width="250" valign="top" bgcolor="d0d0d0" id="item">
                        הערות
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        
        </table>
        <table id="bottom" cellpadding="20" cellspacing="0" width="600" align="center">
            <tr>
            <td align="center">
                <p>Visit our site</p>
                <p><a href="#">Golden Hour Photography</a></p>
            </td>
            </tr>
        </table><!-- top message -->
        </td></tr></table><!-- wrapper -->
        
        </body>
        </html>
        
        
        """
        

        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text, 'plain')
        part2 = MIMEText(email_content, 'html')

        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        msg.attach(part1)
        msg.attach(part2)

        # Send the message via local SMTP server.
        server = smtplib.SMTP('smtp.gmail.com: 587')
        server.starttls()
        
        # Login Credentials for sending the mail
        server.login(me, self.password)
        # sendmail function takes 3 arguments: sender's address, recipient's address
        # and message to send - here it is sent as one string.
        server.sendmail(me ,  you , msg.as_string())
        server.quit()


# mail = Mail()
# order = Order("sdf","10-11","Vasya","023","simalda83@gmail.com","קישון","infant","KATYA PRIVET is SAITA!")
# mail.send_mail(order)
    