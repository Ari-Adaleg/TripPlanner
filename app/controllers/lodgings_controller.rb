class LodgingsController < ApplicationController

    def index
    
    end
    
    def new
        @hotel = Lodging.new
        @trip = Trip.find(params[:trip_id])
        @destination = Destination.find(params[:destination_id])
    end
    
    def create
        @hotel = Lodging.new(hotel_params)
        @trip = Trip.find(params[:trip_id])
        @hotel.destination_id = params[:destination_id]
            if @hotel.save
            redirect_to users_trip_destinations_path(@trip.id)
        else
            render :new
        end
    end
    
    def edit
    end
    
    def update
    end
    
    def delete
    end
    
    def destroy
    end
    
    private
    def hotel_params
        params.require(:lodging).permit(:name)
    end
    
      
      
end
