class DestinationController < ApplicationController
    def get_coordinates
        @destination = params[:name]
        @coordinates = Geocoder.search(@destination)
        respond_to do |format|
            format.json {render json: @coordinates}
        end
    end

    def index
        @trip = Trip.new
        @destination = Destination.new
    end

    def show
    end

    def new
    end

    def create
        @destination = Destination.new(destination_params)

        if @destination.save
            redirect_to root_url
        else
            render :index
        end
    end
end

private
    def destination_params
        params.require(:destination).permit(:leaving_from, :arriving_to, :start_date, :end_date)
    end