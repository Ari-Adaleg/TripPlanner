class RestaurantsController < ApplicationController
  def index

  end

  def new
    @restaurant = Eatery.new
    @trip = Trip.find(params[:trip_id])
    @destination = Destination.find(params[:destination_id])
  end

  def create
    @restaurant = Eatery.new(restaurant_params)
    @trip = Trip.find(params[:trip_id])
    @restaurant.destination_id = params[:destination_id]
        if @restaurant.save
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
  def restaurant_params
      params.require(:eatery).permit(:name)
  end
end

