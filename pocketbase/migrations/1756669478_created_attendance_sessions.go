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
					"cascadeDelete": false,
					"collectionId": "_pb_users_auth_",
					"hidden": false,
					"id": "relation2375276105",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "user",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_1317801859",
					"hidden": false,
					"id": "relation2699804679",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "zone",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "pbc_3021442835",
					"hidden": false,
					"id": "relation608709095",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "beacon",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "date3417759830",
					"max": "",
					"min": "",
					"name": "entry_time",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "date4115006402",
					"max": "",
					"min": "",
					"name": "exit_time",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "date"
				},
				{
					"hidden": false,
					"id": "select2063623452",
					"maxSelect": 1,
					"name": "status",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "select",
					"values": [
						"active",
						"complete",
						"invalid"
					]
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
			"id": "pbc_886840667",
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_TAwGkTTiaK` + "`" + ` ON ` + "`" + `attendance_sessions` + "`" + ` (\n  ` + "`" + `user` + "`" + `,\n  ` + "`" + `created` + "`" + `\n)",
				"CREATE INDEX ` + "`" + `idx_cpX3iMr0c3` + "`" + ` ON ` + "`" + `attendance_sessions` + "`" + ` (\n  ` + "`" + `zone` + "`" + `,\n  ` + "`" + `created` + "`" + `\n)",
				"CREATE INDEX ` + "`" + `idx_ISQ4HcJhak` + "`" + ` ON ` + "`" + `attendance_sessions` + "`" + ` (` + "`" + `status` + "`" + `)"
			],
			"listRule": null,
			"name": "attendance_sessions",
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
		collection, err := app.FindCollectionByNameOrId("pbc_886840667")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
