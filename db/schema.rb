# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_21_163742) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_v1_companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "phone", limit: 15, null: false
    t.date "established_date", null: false
    t.boolean "is_prime", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  create_table "api_v1_phases", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.money "budget", scale: 2, null: false
    t.date "start_date", null: false
    t.date "turnover_date", null: false
    t.boolean "is_done", default: false
    t.bigint "api_v1_project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_v1_project_id"], name: "index_api_v1_phases_on_api_v1_project_id"
  end

  create_table "api_v1_prime_contracts", force: :cascade do |t|
    t.money "amount", scale: 2
    t.bigint "api_v1_project_id", null: false
    t.bigint "api_v1_company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_v1_company_id"], name: "index_api_v1_prime_contracts_on_api_v1_company_id"
    t.index ["api_v1_project_id"], name: "index_api_v1_prime_contracts_on_api_v1_project_id"
  end

  create_table "api_v1_projects", force: :cascade do |t|
    t.string "name", null: false
    t.string "owner", null: false
    t.string "location", null: false
    t.money "budget", scale: 2, null: false
    t.date "start_date", null: false
    t.date "turnover_date", null: false
    t.boolean "is_done", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "api_v1_sub_contracts", force: :cascade do |t|
    t.money "amount", scale: 2
    t.bigint "api_v1_task_id", null: false
    t.bigint "api_v1_company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_v1_company_id"], name: "index_api_v1_sub_contracts_on_api_v1_company_id"
    t.index ["api_v1_task_id"], name: "index_api_v1_sub_contracts_on_api_v1_task_id"
  end

  create_table "api_v1_tasks", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.money "budget", scale: 2, null: false
    t.date "start_date", null: false
    t.date "turnover_date", null: false
    t.boolean "is_done", default: false
    t.bigint "api_v1_phase_id", null: false
    t.index ["api_v1_phase_id"], name: "index_api_v1_tasks_on_api_v1_phase_id"
  end

  add_foreign_key "api_v1_phases", "api_v1_projects"
  add_foreign_key "api_v1_prime_contracts", "api_v1_companies"
  add_foreign_key "api_v1_prime_contracts", "api_v1_projects"
  add_foreign_key "api_v1_sub_contracts", "api_v1_companies"
  add_foreign_key "api_v1_sub_contracts", "api_v1_tasks"
  add_foreign_key "api_v1_tasks", "api_v1_phases"
end
