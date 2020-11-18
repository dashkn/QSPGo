package qsp

import (
	"fmt"
	"math"
	"math/cmplx"
	"strconv"
)

// GetAND return Classical AND gate
func GetAND() [][]complex128 {
	return [][]complex128{
		{1, 1, 1, 0},
		{0, 0, 0, 1},
	}
}

// GetOR return Classical OR gate
func getOR() [][]complex128 {
	return [][]complex128{
		{1, 0, 0, 0},
		{0, 1, 1, 1},
	}
}

// GetXOR return Classical XOR gate
func GetXOR() [][]complex128 {
	return [][]complex128{
		{1, 0},
		{0, 1},
	}
}

// GetNOT return Classical NOT gate
func GetNOT() [][]complex128 {
	return [][]complex128{
		{0, 1},
		{1, 0},
	}
}

// GetRy return Ry(theta) gate
func GetRy(theta complex128) [][]complex128 {
	return [][]complex128{
		{cmplx.Cos(theta / 2), -cmplx.Sin(theta / 2)},
		{cmplx.Sin(theta / 2), cmplx.Cos(theta / 2)},
	}
}

// GetRx return Rx(theta) gate
func GetRx(theta complex128) [][]complex128 {
	return [][]complex128{
		{cmplx.Cos(theta / 2), -(complex(0, 1) * cmplx.Sin(theta/2))},
		{-(complex(0, 1) * cmplx.Sin(theta/2)), cmplx.Cos(theta / 2)},
	}
}

// GetRz return Rz(theta) gate
func GetRz(theta complex128) [][]complex128 {
	return [][]complex128{
		{-(cmplx.Cos(theta/2) + (complex(1, 0) * cmplx.Sin(theta/2))), 0},
		{0, (cmplx.Cos(theta/2) + (complex(1, 0) * cmplx.Sin(theta/2)))},
	}
}

// Observe is operation to get BitString of |state> after |state> is measured
func Observe(state []complex128) map[string]complex128 {
	var (
		s   string
		n   = int64(len(state))
		nqb = int(math.RoundToEven(math.Sqrt(float64(n))))
		ret = make(map[string]complex128)
		i   = int64(0)
	)
	for i < n {
		s = fmt.Sprintf("%0*s", nqb, strconv.FormatInt(i, 2))
		ret[s] = state[i]
		i++
	}

	return ret
}

// PrintState is a function to print state vector
func PrintState(state map[string]complex128) {
	var (
		n   = int(len(state))
		nqb = int(math.RoundToEven(math.Sqrt(float64(n))))
		pad string
		// prob float64
	)
	for k, v := range state {
		pad = fmt.Sprintf("%0*s", nqb, k)
		fmt.Println("State:", pad, "Value:", v)
		pad = ""
	}
}
