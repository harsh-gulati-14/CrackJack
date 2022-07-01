def open_resources(file_path):
    return [item.replace("\n", "") for item in open(file_path).readlines()]


# GLOBAL CONSTANT VARIABLES -------

# Getting list of potentials password
PASSWORDS = open_resources('./resources/passwords2.txt')
# Getting list of user to test with
USERS = open_resources('./resources/users.txt')
# Limit of trying connections
LIMIT_TRYING_ACCESSING_URL = 7
