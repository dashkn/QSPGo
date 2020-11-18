package qsp

import (
	"errors"
	"math"
	"math/cmplx"
)

// Bra is operation to get bra of a ket
func Bra(ket []complex128) []complex128 {
	var (
		val complex128
		n   = len(ket)
		ret = make([]complex128, 0, n)
	)

	for i := 0; i < n; i++ {
		val = cmplx.Conj(ket[i])
		ret = append(ret, val)
	}
	return ret
}

// BraKet is Product of a bra and a ket
func BraKet(bra []complex128, ket []complex128) ([]complex128, error) {
	var (
		total = 0 + 0i
		n     = len(bra)
		p     = len(ket)
		ret   = make([]complex128, 0, p)
	)

	if n != p {
		return nil, errors.New("braket is not equal in dimension")
	}

	for i := 0; i < n; i++ {
		total += bra[i] * ket[i]

	}

	ret = append(ret, total)
	return ret, nil
}

// Product operation of 2d matrix on the left and vector on the right
func Product(left [][]complex128, right []complex128) ([]complex128, error) {
	var (
		total complex128
		n     = len(left)
		m     = len(left[0])
		p     = len(right)
		ret   = make([]complex128, 0, p)
	)

	if m != p {
		return nil, errors.New("row on the left is not equal to col on the right")
	}

	for i := 0; i < n; i++ {
		total = 0 + 0i
		for j := 0; j < m; j++ {
			total += left[i][j] * right[j]
		}
		ret = append(ret, total)
	}
	return ret, nil
}

// Tensor return |left> tensor |right>
func Tensor(left []complex128, right []complex128) ([]complex128, error) {
	var (
		n   = len(left)
		p   = len(right)
		ret = make([]complex128, 0, n*p)
	)

	for i := 0; i < n; i++ {
		for j := 0; j < p; j++ {
			ret = append(ret, left[i]*right[j])
		}

	}

	return ret, nil
}

// Dagger is a operation that return complex conjugate transpost of a matrix
// in this case is our gate
func Dagger(gate [][]complex128) {
	var (
		n   = len(gate)
		ret = make([][]complex128, n)
	)

	for i := 0; i < n; i++ {
		ret[i] = make([]complex128, n)
		for j := 0; j < n; j++ {
			ret[i][j] = cmplx.Conj(gate[j][i])
		}
	}
	copy(gate, ret)
}

// Norm return length of the vector
func Norm(vec []complex128) complex128 {
	var (
		total = complex(0, 0)
	)

	for i := 0; i < len(vec); i++ {
		total += cmplx.Pow(vec[i], 2)

	}

	return cmplx.Sqrt(total)
}

// Normalize the vector
func Normalize(vec []complex128) {
	var (
		n    = len(vec)
		ret  = make([]complex128, n, n)
		norm = Norm(vec)
	)

	for i := 0; i < n; i++ {
		ret[i] = vec[i] / norm
	}

	copy(vec, ret)
}

// Prob is a method to find state probability
func Prob(vec []complex128) []complex128 {
	var (
		n   = len(vec)
		ret = make([]complex128, 0, n)
	)
	Normalize(vec)
	for i := 0; i < n; i++ {
		ret = append(ret, cmplx.Pow(vec[i], 2))
	}
	return ret
}

// CombineAll is combine but all
func CombineAll(superState [][]complex128) []complex128 {
	var (
		n        = len(superState)
		substate = make([]complex128, 0, int(math.Pow(float64(2), float64(n))))
	)

	substate, _ = Tensor(superState[0], superState[1])
	for i := 1; i < n-1; i++ {
		substate, _ = Tensor(substate, superState[i+1])
	}
	return substate
}
