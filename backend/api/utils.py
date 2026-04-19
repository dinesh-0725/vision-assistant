# import requests
# from django.conf import settings
# from django.core.mail import send_mail
# import logging

# logger = logging.getLogger(__name__)

# # def send_email_to_list(subject, message, recipient_list):
# #     if not recipient_list:
# #         logger.info("No recipient emails provided.")
# #         return False
# #     try:
# #         send_mail(
# #             subject=subject,
# #             message=message,
# #             from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@visionassist.com'),
# #             recipient_list=recipient_list,
# #             fail_silently=False
# #         )
# #         logger.info(f"Email sent to {recipient_list}")
# #         return True
# #     except Exception as e:
# #         logger.exception("Failed to send email")
# #         return False
# # import requests
# # import logging
# from django.core.validators import validate_email
# from django.core.exceptions import ValidationError

# def send_email_to_list(subject, message, recipient_list):
#     if not recipient_list:
#         logger.info("No recipient emails provided.")
#         return False
#     # Basic validation
#     clean_recipients = []
#     for e in recipient_list:
#         try:
#             validate_email(e)
#             clean_recipients.append(e)
#         except ValidationError:
#             logger.warning(f"Invalid email skipped: {e}")
#     if not clean_recipients:
#         logger.info("No valid recipient emails.")
#         return False

#     try:
#         send_mail(
#             subject=subject,
#             message=message,
#             from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@visionassist.com'),
#             recipient_list=clean_recipients,
#             fail_silently=False
#         )
#         logger.info(f"Email sent to {clean_recipients}")
#         return True
#     except Exception:
#         logger.exception("Failed to send email")
#         return False

# logger = logging.getLogger(__name__)

# def send_telegram_message(bot_token: str, chat_id: str, text: str, parse_mode: str = "HTML") -> bool:
#     """
#     Send message using Telegram Bot API. Returns True on success.
#     """
#     if not bot_token or not chat_id or not text:
#         logger.info("Telegram bot_token, chat_id or text missing.")
#         return False
#     try:
#         url = f"https://api.telegram.org/bot8492154232:AAHItiFn4_B4GeeWnG-OaGRoYdkn0w9Sho4/sendMessage"
#         payload = {
#             "chat_id": 5559866642,
#             "text": text,
#             "parse_mode": parse_mode,
#             # "disable_web_page_preview": True,
#         }
#         resp = requests.post(url, json=payload, timeout=10)
#         resp.raise_for_status()
#         logger.info(f"Telegram message sent to {chat_id}: {resp.text}")
#         return True
#     except Exception:
#         logger.exception("Failed to send Telegram message")
#         return False

# # def send_telegram_message(bot_token, chat_id, text):
# #     """
# #     Send message using Telegram Bot API. chat_id can be integer or string.
# #     """
# #     if not bot_token or not chat_id:
# #         logger.info("Telegram bot token or chat_id missing.")
# #         return False
# #     try:
# #         url = f"https://api.telegram.org/bot8492154232:AAHItiFn4_B4GeeWnG-OaGRoYdkn0w9Sho4/sendMessage"
# #         payload = {
# #             "chat_id": 5559866642,
# #             "text": Emergency+Alert+Someone+needs+help,
# #             "parse_mode": "HTML"
# #         }
# #         resp = requests.post(url, data=payload, timeout=10)
# #         resp.raise_for_status()
# #         logger.info(f"Telegram message sent to {chat_id}: {resp.text}")
# #         return True
# #     except Exception:
# #         logger.exception("Failed to send Telegram message")
# #         return False


# api/utils.py
import logging
from django.core.mail import send_mail
from django.conf import settings
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

logger = logging.getLogger(__name__)

def send_email_to_list(subject: str, message: str, recipient_list):
    """
    Send email to a list of recipients.
    recipient_list: iterable of emails (strings)
    Returns True if at least one email was sent (no exceptions), else False.
    """
    if not recipient_list:
        logger.info("No recipient emails provided.")
        return False

    # Validate emails and remove empties
    clean = []
    for e in recipient_list:
        if not e:
            continue
        e = e.strip()
        try:
            validate_email(e)
            clean.append(e)
        except ValidationError:
            logger.warning("Invalid email skipped: %s", e)

    if not clean:
        logger.info("No valid recipient emails after validation.")
        return False

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@visionassist.com'),
            recipient_list=clean,
            fail_silently=False,
        )
        logger.info("Email sent to: %s", clean)
        return True
    except Exception:
        logger.exception("Failed to send email to: %s", clean)
        return False
