class TripsController < ApplicationController
    def index
    end

    def new
        @trip = Trip.new
    end

    def create
        @trip = Trip.new(trip_params)
        @trip.user_id = current_user.id

        p "....DONE!!!!!!!!! #{@trip.inspect}"

        if @trip.save
            redirect_to root_url
        else
            render :new
        end
    end
end


private
    def trip_params
        params.require(:trip).permit(:name)
    end