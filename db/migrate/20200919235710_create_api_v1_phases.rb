class CreateApiV1Phases < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_phases do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.money :budget, null: false
      t.date :start_date, null: false
      t.date :turnover_date, null: false
      t.boolean :is_done, default: false
      t.belongs_to :api_v1_project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
