
from DataAccess import DataAccess

class DataAccessLocation(DataAccess):
    
    
    def get_all_locations_info(self):
        self.collection = self.mydb['locations']
        locations = []
        result = self.collection.find( )
        for location in result:
            locations.append({
            "name":  location["name"],
            "type": location["locationType"],
            "longtitude": location["longtitude"],
            "latitude" : location["latitude"]
        })
        return locations

    def get_all_images_for_location(self, location):
        self.collection = self.mydb['images']
        images = []
        result = self.collection.find({ "location" : location } )
        for image in result:
            images.append({
            "name":image["name"],
            "imageType" : image["imageType"],
            "eventType" :image["eventType"],
            "location": image["location"]
        })
        return images

    def add_location(self, location):
        self.collection = self.mydb['locations']
        self.collection.insert_one(
        { "name" : location.name,
            "locationType" : location.location_type,
            "latitude" : location.latitude,
            "longtitude" : location.longtitude,
            "description":location.description
        }
        )
        return True

    def add_location_type(self, location_type):
        self.collection = self.mydb['locationTypes']
        self.collection.insert_one({"name" : location_type})
        return True

    def delete_location_type(self, location_type):
        self.collection = self.mydb['locationTypes']
        myquery = { "name":location_type}
        self.collection.delete_one(myquery)
        self.collection = self.mydb['locations']
        myquery = { "locationType": location_type }
        newvalues = { "$set": {"locationType":  "" } }     
        self.collection.update_one(myquery, newvalues)


    def delete_location(self):
        pass

    def upsert_link(self, link):
        self.collection = self.mydb['imageLinker']
        result = self.collection.find({"origin" : link.origin, "destination": link.destination})

        if len(result):
            myquery = {"origin" : link.origin, "destination": link.destination, "latitude": link.latitude,"longtitude": link.longtitude}
            newvalues = { "$set": {"origin" : link.origin, "destination": link.destination, "latitude": link.latitude,"longtitude": link.longtitude} }

            query = self.collection.update_one(myquery, newvalues)
            print(query.modified_count, "documents updated.")
        else:
            self.collection.insert_one({"origin" : link.origin, "destination": link.destination, "latitude": link.latitude,"longtitude": link.longtitude})
            return True
         

    def get_links_for_image(self, image):
        self.collection = self.mydb['imageLinker']
        result = self.collection.find({ "origin" : image.name } )
        links = list(map(lambda link: {
            "origin":link["origin"],
            "destination" : link["destination"],
            "latitude" :link["latitude"],
            "longtitude": link["longtitude"]
        },result)) 
        return links

    def remove_links_from(self):
        pass

