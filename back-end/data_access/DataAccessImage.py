from .DataAccess import DataAccess
import logging
logger = logging.getLogger(__name__)


class DataAccessImage(DataAccess):
    def add_image(self,image):
        self.collection = self.mydb['images']
        self.collection.insert_one(
        { "name" : image.name,
            "imageType" : image.image_type,
            "eventType" : image.event_type,
            "location" : image.location
        }
        )
        return True

    def edit_all_images(self, image_list):
        for image in image_list:
            self.edit_image(image)

    def edit_image(self, im):
        self.collection = self.mydb['images']
        myquery = { "name": im.name}
        newvalues = { "$set": { "imageType" : im.image_type,
            "eventType":im.event_type,
            "location":im.location } }
        query = self.collection.update_one(myquery, newvalues)
        logger.info('In FUNCTION %s number of modified rows: %s\n', 'edit_image', query.modified_count)

    def delete_image(self, image):
        self.collection = self.mydb['images']
        myquery = { "name": image.name}
        self.collection.delete_one(myquery)
 

    def get_all_images(self):
        self.collection = self.mydb['images']
        return list(map(lambda image:{
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        }, self.collection.find()))
        
  