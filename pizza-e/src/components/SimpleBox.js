// src/components/BoxSimple.jsx
import React from 'react'
import PropTypes from 'prop-types'
import './styles/SimpleBoxStyle.css'

const SimpleBox = ({ children }) => (
    <div style={styles.SimpleBox}>
        {children}
    </div>
)
SimpleBox.propTypes = {
    children: PropTypes.node.isRequired,
}
export default SimpleBox