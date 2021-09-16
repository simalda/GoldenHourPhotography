import os
DBNAME = os.environ['DBNAME']
DBURL = os.environ['DBURL']


UPLOAD_FOLDER = r'C:\Users\simal\Projects_Git\GoldenHourPhotography\images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg','png'}
PHOTOS_BASE_URL ='http://localhost:5000/image-files/'