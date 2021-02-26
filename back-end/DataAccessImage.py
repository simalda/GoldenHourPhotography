from DataAccess import DataAccess
class DataAccessImage(DataAccess):
    def addImage(self,image):
        self.mycollection = self.mydb['images']
        self.mycollection.insert_one(
        { "name" : image.name,
            "imageType" : image.imageType,
            "eventType" : image.eventType,
            "location" : image.location
        }
        )
        return True

    def editAllImages(self, imList):
        for im in imList:
            self.editImage(im)

    def editImage(self, im):
        self.imagesCollection = self.mydb['images']
        myquery = { "name": im.name}
        newvalues = { "$set": { "imageType" : im.imageType,
            "eventType":im.eventType,
            "location":im.location } }

        x = self.imagesCollection.update_one(myquery, newvalues)
        print(x.modified_count, "documents updated.")
    
    def deleteImage(self, image):
        self.imagesCollection = self.mydb['images']
        myquery = { "name": image.name}
        self.imagesCollection.delete_one(myquery)
 

    def getAllImages(self):
        self.imagesCollection = self.mydb['images']
        images = []
        result = self.imagesCollection.find( )
        for image in result:
            images.append({
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        })
        print(images)
        return images

    def getAllImagesForLocation(self, location):
        self.imagesCollection = self.mydb['images']
        images = []
        result = self.imagesCollection.find({ "location" : location } )
        for image in result:
            images.append({
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        })
        print(images)
        return images