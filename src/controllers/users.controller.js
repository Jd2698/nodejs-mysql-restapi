import { pool } from '../db.js'

const getUsers = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM users')
		res.json(rows)
	} catch (error) {
		res.status(500).json({ message: 'Something goes wrang' })
	}
}

const getUser = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [
			req.params.id
		])

		if (rows.length <= 0) return res.status(404).json({ message: 'Not found' })

		res.json(rows[0])
	} catch (error) {
		res.status(500).json({ message: 'Something goes wrang' })
	}
}

const createUser = async (req, res) => {
	const { name, email, password } = req.body

	try {
		const [result] = await pool.query(
			'SELECT id FROM users ORDER BY id DESC LIMIT 1'
		)

		const newId = parseInt(result[0].id) + 1

		const [rows] = await pool.query('INSERT INTO users VALUES (?,?,?,?)', [
			newId,
			name,
			email,
			password
		])

		res.json({
			id: newId,
			name,
			email
		})
	} catch (error) {
		res.status(500).json({ message: 'Something goes wrang' })
	}
}

const updateUser = async (req, res) => {
	const { id } = req.params
	const { name, email, password } = req.body

	try {
		const [
			result
		] = await pool.query(
			'UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id = ?',
			[name, email, password, id]
		)

		if (result.affectedRows == 0)
			return res.status(404).json({ message: 'Not found' })

		res.sendStatus(204)
	} catch (error) {
		res.status(500).json({ message: 'Something goes wrang' })
	}
}

const deleteUser = async (req, res) => {
	try {
		const [rows] = await pool.query('DELETE FROM users WHERE id = ?', [
			req.params.id
		])

		if (rows.affectedRows == 0) {
			return res.status(404).json({ message: 'Not found' })
		}

		res.sendStatus(204)
	} catch (error) {
		res.status(500).json({ message: 'Something goes wrang' })
	}
}

export default {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
}
