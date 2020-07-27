class Destination < ApplicationRecord
    has_many :eateries
    has_many :lodgings
    has_many :attractions
    belongs_to :trip
end
