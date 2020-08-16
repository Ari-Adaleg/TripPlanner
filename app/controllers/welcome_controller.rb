class WelcomeController < ApplicationController
  def index
    @destination = Destination.new
    # This is a list of 15 cities for suggestions on where to travel to.
    @cities = ["London, England", "Bangkok, Thailand", "Paris, France", "Dubai, United Arab Emirates", "Istanbul, Turkey", "New York City, United States", "Singapore City, Singapore", "Kuala Lumpur, Malaysia", "Seoul, South Korea", "Hong Kong, China", "Tokyo, Japan", "Barcelona, Spain", "Amsterdam, Netherlands", "Rome, Italy", "Milan, Italy"]
    @pic1 = @cities.sample
    @pic2 = @cities.sample
    if @pic2 == @pic1
      @pic2 = @cities.sample
    end
    @pic3 = @cities.sample
    if @pic3 == @pic1 || @pic3 == @pic2
      @pic3 = @cities.sample
    end
  end

  def get_territories
    @country = params[:country]
    @territories = CS.get(@country)
    respond_to do |format| 
      format.json {render json: @territories}
    end
  end

  def get_cities
    @country = params[:country]
    @territory = params[:territory]
    @cities = CS.get(@country, @territory)
    respond_to do |format|
      format.json {render json: @cities}
    end
  end

  def get_coordinates
    @destination = params[:name]
    @coordinates = Geocoder.search(@destination)
    respond_to do |format|
        format.json {render json: @coordinates}
    end
  end


  def new
  end

end