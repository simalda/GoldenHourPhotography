class ImageLinkerHandler():
    def __init__(self, data_access):
        self.data_access = data_access

    def remove_link_from(self, origin):
        pass

    def upsert_link(self, link):
        self.data_access.upsert_link(link)

    def get_links_for_image(self, image):
        return self.data_access.get_links_for_image(image)