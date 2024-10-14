package src

type SeatManager struct {
	n  int   // n-1 个座位
	ok []int // ok[i] 座位 i 是否可以预约
	// 0 可预约，-1 不可预约
	// ok[0] 当前可预约座位的最小编号
}

func Constructor(n_ int) SeatManager {
	ret := SeatManager{
		n:  n_ + 1,
		ok: make([]int, n_+1),
	}
	ret.ok[0] = 1
	return ret
}

func (s *SeatManager) Reserve() int {
	ret := s.ok[0]
	s.ok[s.ok[0]] = -1
	for i := s.ok[0]; true; {
		if s.ok[i] == -1 {
			i++
			if i == s.n { // 暂时没有可预约座位
				s.ok[0] = s.n
				break
			}
			continue
		}
		// s.ok[i] == 0
		s.ok[0] = i // ok
		break
	}
	return ret
}

func (s *SeatManager) Unreserve(seatNumber int) {
	s.ok[seatNumber] = 0
	if seatNumber < s.ok[0] {
		s.ok[0] = seatNumber
	}
}
