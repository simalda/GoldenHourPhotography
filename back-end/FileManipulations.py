

def get_from_folder():
    f = open('C:\myimg.png', 'rb') # opening a binary file
    content = f.read() # reading all lines 
    f.close() # closing file object
    return content