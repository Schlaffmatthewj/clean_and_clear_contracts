class CreateApiV1Tasks < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_tasks do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.money :budget, null: false
      t.date :start_date, null: false
      t.date :turnover_date, null: false
      t.boolean :is_done, default: false
      t.belongs_to :api_v1_phase, null: false, foreign_key: true
    end
  end
end
