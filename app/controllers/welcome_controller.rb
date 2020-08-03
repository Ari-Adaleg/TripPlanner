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

  def new
  end

end