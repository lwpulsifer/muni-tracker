import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
	arr.reduce((groups, item) => {
		(groups[key(item)] ||= []).push(item);
		return groups;
	}, {} as Record<K, T[]>);

type NativeComparable = boolean | number | string;
type Comparator<T> = (arg: T) => NativeComparable;

/**
 * Returns a function of the form expected by Array.sort whose comparison keys are obtained
 * by applying the given sort func to both elements being compared. Uses the natural
 * comparison order of the type returned by sort func. For descending order, reverse the sorted array
 * with Array.prototype.reverse().
 */
export const by =
	<T>(...comparators: Comparator<T>[]) =>
	(e1: T, e2: T) => {
		// Iterate through all comparators.
		for (const comparator of comparators) {
			const e1SortKey = comparator(e1);
			const e2SortKey = comparator(e2);
			if (e1SortKey < e2SortKey) {
				return -1;
			} else if (e1SortKey > e2SortKey) {
				return 1;
			}
			// If 0, we continue to apply further comparators in search of a tiebreaker.
		}
		return 0;
	};
