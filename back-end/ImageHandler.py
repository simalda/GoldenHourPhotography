
class ImageHandler():
    def __init__(self, dataAccess):
        self.dataAccess = dataAccess
    
    def get_all_images(self):
        self.dataAccess.getAllImages()

    def edit_all_images(self, imageList):
        self.dataAccess.editAllImages(imageList)

    def add_image(self, image):
        self.dataAccess.addImage(image)

    def delete_image(self, image):
        self.dataAccess.deleteImage(image)

    def edit_image(self):
        self.dataAccess.editImage()