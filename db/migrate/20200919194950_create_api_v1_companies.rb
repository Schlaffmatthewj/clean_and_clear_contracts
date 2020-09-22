class CreateApiV1Companies < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_companies do |t|
      t.string :name, null: false, unique: true
      t.string :address, null: false, unique: true
      t.string :phone, null: false, unique: true, limit: 15
      t.date :established_date, null: false
      t.boolean :is_prime, default: false

      t.timestamps
    end
  end
end
