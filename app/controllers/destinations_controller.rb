class DestinationsController < ApplicationController
    def get_coordinates
        @destination = params[:name]
        @coordinates = Geocoder.search(@destination)
        respond_to do |format|
            format.json {render json: @coordinates}
        end
    end

    def index
    end

    def show
    end

    def new
    end

    def create
    end
end
