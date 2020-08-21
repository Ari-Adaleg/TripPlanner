class Trip < ApplicationRecord
    geocoded_by :address  # Letting Geocoder gem know which     
                                  # method returns an address
 
    after_validation :geocode         # auto-fetch coordinates
    has_many :destinations
    belongs_to :user

    accepts_nested_attributes_for :destinations
end
