package src

func maxEnergyBoost(energyDrinkA []int, energyDrinkB []int) int64 {
	ia, ib, n := 0, 0, len(energyDrinkA)
	ans := int64(0)
	for n > 0 {
		if n == 1 {
			ans += int64(energyDrinkA[ia])
			return ans
		}

		if energyDrinkA[ia] >= energyDrinkA[ib] {
			ans += int64(energyDrinkA[ia])
			ia, n = ia+1, n-1
			continue
		}

		// energyDrinkA[ia] < energyDrinkA[ib]
		if energyDrinkA[ia]+energyDrinkB[ia+1] >= energyDrinkB[ib+1] {
			ans += int64(energyDrinkA[ia]) + int64(energyDrinkB[ia+1])
			ia, n = ia+2, n-2
		} else {
			ia, ib = ib, ia
			energyDrinkA, energyDrinkB = energyDrinkB, energyDrinkA
			ans += int64(energyDrinkA[ia+1])
			ia, n = ia+2, n-2
			continue
		}
	}
	return ans
}
