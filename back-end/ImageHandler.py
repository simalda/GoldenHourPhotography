
class ImageHandler():
    def __init__(self, data_access):
        self.data_access = data_access
    
    def get_all_images(self):
        self.data_access.get_all_images()

    def edit_all_images(self, image_list):
        self.data_access.edit_all_images(image_list)

    def add_image(self, image):
        self.data_access.add_image(image)

    def delete_image(self, image):
        self.data_access.delete_image(image)

    def edit_image(self):
        self.data_access.edit_image()