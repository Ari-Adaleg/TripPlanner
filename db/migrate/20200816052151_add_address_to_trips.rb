class AddAddressToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :address, :string
  end
end
