package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text1579384326",
					"max": 0,
					"min": 0,
					"name": "name",
					"pattern": "",
					"presentable": false,
					"primaryKey": false,
					"required": true,
					"system": false,
					"type": "text"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor1843675174",
					"maxSize": 0,
					"name": "description",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"convertURLs": false,
					"hidden": false,
					"id": "editor223244161",
					"maxSize": 0,
					"name": "address",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "editor"
				},
				{
					"hidden": false,
					"id": "geoPoint299623326",
					"name": "ubication",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "geoPoint"
				},
				{
					"hidden": false,
					"id": "bool458715613",
					"name": "is_active",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "bool"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_2873630990",
					"hidden": false,
					"id": "relation3253625724",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "organization",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_1317801859",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_ZvpVRSJ0JA` + "`" + ` ON ` + "`" + `zones` + "`" + ` (` + "`" + `organization` + "`" + `)"
			],
			"listRule": null,
			"name": "zones",
			"system": false,
			"type": "base",
			"updateRule": null,
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1317801859")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
