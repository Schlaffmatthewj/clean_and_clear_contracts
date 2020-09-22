class CreateApiV1Projects < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_projects do |t|
      t.string :name, null: false, unique: true
      t.string :owner, null: false
      t.string :location, null: false
      t.money :budget, null: false
      t.date :start_date, null: false
      t.date :turnover_date, null: false
      t.boolean :is_done, default: false

      t.timestamps
    end
  end
end
