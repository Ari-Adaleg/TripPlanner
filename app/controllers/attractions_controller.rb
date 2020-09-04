class AttractionsController < ApplicationController
    def index
    
    end
    
    def new
        @attraction = Attraction.new
        @trip = Trip.find(params[:trip_id])
        @destination = Destination.find(params[:destination_id])
    end
    
    def create
        @attraction = Attraction.new(attractions_params)
        @trip = Trip.find(params[:trip_id])
        @attraction.destination_id = params[:destination_id]
            if @attraction.save
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
    def attractions_params
        params.require(:attraction).permit(:name, :date)
    end
end
