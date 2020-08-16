class TripsController < ApplicationController
    def index
        @trips = current_user.trips.all
        @destinations = Destination.all
    end

    def address
        [street, city, state, country].compact.join(', ')
      end

    def new
        @trip = current_user.trips.new
        @trip.destinations.build
        @user_home = Geocoder.coordinates(current_user.city)
    end

    def create
        @user_home = Geocoder.coordinates(current_user.city)
        @trip = current_user.trips.new trip_params

        p "....DONE!!!!!!!!! #{@trip.inspect}"

        if @trip.save
            redirect_to users_trips_url
        else
            render :new
        end
    end
end


private
    def trip_params
        params.require(:trip).permit(:name, destinations_attributes:[:leaving_from, :arriving_to, :start_date, :end_date])
    end