"use client";

import { useState, useEffect } from "react";
import { useCondolenceStore, type 조의금목록 } from "@/store/condolence-store";
import { useExpenseStore } from "@/store/expense-store";

const 상주옵션 = [
  "김재진",
  "김재규",
  "김재걸",
  "김재길",
  "김숙자",
  "하영호(하누리)",
  "경두수(경복현)",
  "신하영",
  "신하정",
  "상주이름 안적힘",
  "할아버지/할머니"
] as const;

export default function Home() {
  // const [상주이름, set상주이름] = useState<string>("");
  // const [지인이름, set지인이름] = useState("");
  // const [액수, set액수] = useState("");
  const [검색어, set검색어] = useState("");
  const [지출구분, set지출구분] = useState("");
  const [지출금액, set지출금액] = useState("");
  const { 저장목록, fetch목록, isLoading, error } = useCondolenceStore();
  const {
    지출목록,
    fetch목록: 지출Fetch목록,
    추가: 지출추가,
    error: 지출Error
  } = useExpenseStore();

  useEffect(() => {
    fetch목록();
    지출Fetch목록();
  }, [fetch목록, 지출Fetch목록]);

  // const handle확인 = async () => {
  //   if (!상주이름 || !지인이름 || !액수 || 액수 === "-" || isNaN(Number(액수)))
  //     return;
  //   await 추가({ 상주이름, 지인이름, 액수 });
  //   set상주이름("");
  //   set지인이름("");
  //   set액수("");
  // };

  const handle지출확인 = async () => {
    if (!지출구분 || !지출금액 || 지출금액 === "-" || isNaN(Number(지출금액)))
      return;
    await 지출추가({ 구분: 지출구분, 금액: 지출금액 });
    set지출구분("");
    set지출금액("");
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-10 text-center text-2xl font-semibold text-black">
          故김정열님, 조의금 정리
        </h1>

        {/* <form
          className="flex flex-row items-end gap-4 rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label
              htmlFor="상주이름"
              className="text-sm font-medium text-black"
            >
              상주이름
            </label>
            <select
              id="상주이름"
              value={상주이름}
              onChange={(e) => set상주이름(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
            >
              <option value="">선택해주세요</option>
              {상주옵션.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label
              htmlFor="지인이름"
              className="text-sm font-medium text-black"
            >
              지인이름
            </label>
            <input
              id="지인이름"
              type="text"
              value={지인이름}
              onChange={(e) => set지인이름(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label htmlFor="액수" className="text-sm font-medium text-black">
              액수 (원)
            </label>
            <input
              id="액수"
              type="text"
              inputMode="numeric"
              value={
                액수
                  ? (액수.startsWith("-") ? "-" : "") +
                    Math.abs(Number(액수.replace("-", "")))
                      .toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const val = e.target.value;
                const isNegative = val.startsWith("-");
                const digits = val.replace(/\D/g, "");
                set액수(
                  isNegative && !digits ? "-" : digits ? (isNegative ? "-" + digits : digits) : ""
                );
              }}
              placeholder="0"
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
            />
          </div>
          <button
            type="button"
            onClick={handle확인}
            className="shrink-0 rounded-lg bg-stone-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            확인
          </button>
        </form> */}

        {/* 검색 */}
        <div className="mt-4 flex flex-row items-center gap-2">
          <label
            htmlFor="검색"
            className="shrink-0 text-sm font-medium text-black"
          >
            검색
          </label>
          <input
            id="검색"
            type="text"
            value={검색어}
            onChange={(e) => set검색어(e.target.value)}
            placeholder="지인이름으로 검색"
            className="flex-1 rounded-lg border border-stone-300 bg-stone-100 px-4 py-2.5 text-sm text-black placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
          />
        </div>

        {(error || 지출Error) && (
          <p className="mt-4 text-center text-sm text-red-600">
            {error || 지출Error}
          </p>
        )}
        {isLoading ? (
          <p className="mt-10 text-center text-stone-500">
            데이터 불러오는 중...
          </p>
        ) : (
          (() => {
            const 검색필터목록 = 검색어
              ? 저장목록.filter((item) =>
                  item.지인이름
                    .toLowerCase()
                    .includes(검색어.toLowerCase().trim())
                )
              : 저장목록;

            if (검색필터목록.length === 0) {
              return (
                <p className="mt-10 text-center text-sm text-stone-500">
                  {검색어
                    ? "검색 결과가 없습니다."
                    : "저장된 데이터가 없습니다."}
                </p>
              );
            }

            const 상주별목록 = 검색필터목록.reduce<
              Record<string, 조의금목록[]>
            >((acc, item) => {
              if (!acc[item.상주이름]) acc[item.상주이름] = [];
              acc[item.상주이름].push(item);
              return acc;
            }, {});
            const 정렬된상주 = 상주옵션.filter(
              (name) => 상주별목록[name] && 상주별목록[name].length > 0
            );
            const 총액 = 검색필터목록.reduce(
              (sum, item) => sum + Number(item.액수),
              0
            );

            return (
              <section className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
                <div className="space-y-6">
                  {정렬된상주.map((상주) => {
                    const 목록 = 상주별목록[상주];
                    const 상주총액 = 목록.reduce(
                      (sum, item) => sum + Number(item.액수),
                      0
                    );
                    return (
                      <div key={상주}>
                        <h3 className="mb-3 text-xl font-bold text-black">
                          {상주}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[300px] border-collapse text-sm">
                            <thead>
                              <tr className="border-b border-stone-300">
                                <th className="pb-2 pr-4 text-left font-medium text-black">
                                  지인이름
                                </th>
                                <th className="pb-2 pr-4 text-right font-medium text-black">
                                  액수 (원)
                                </th>
                                {/* <th className="pb-2 w-16 font-medium text-black" /> */}
                              </tr>
                            </thead>
                            <tbody>
                              {목록.map((item) => (
                                <tr
                                  key={item.id}
                                  className="border-b border-stone-200 last:border-0"
                                >
                                  <td className="py-2 pr-4 text-lg text-black">
                                    {item.지인이름}
                                  </td>
                                  <td className="py-2 pr-4 text-right text-lg text-black">
                                    {Number(item.액수).toLocaleString()}원
                                  </td>
                                  {/* <td className="py-2">
                                    <button
                                      type="button"
                                      onClick={() => 삭제(item.id)}
                                      className="rounded border border-stone-300 bg-white px-2 py-1 text-xs text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
                                    >
                                      삭제
                                    </button>
                                  </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-right text-xl font-bold text-black">
                          소계: {상주총액.toLocaleString()}원
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 border-t border-stone-300 pt-4">
                  <p className="text-right text-xl font-semibold text-black">
                    총액: {총액.toLocaleString()}원
                  </p>
                </div>
              </section>
            );
          })()
        )}

        {/* 지출내역 */}
        <section className="mt-16 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-bold text-black">지출내역</h2>
          <div className="mb-6 flex flex-row items-end gap-4 rounded-lg border border-stone-200 bg-stone-100 p-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label
                htmlFor="지출구분"
                className="text-sm font-medium text-black"
              >
                구분
              </label>
              <input
                id="지출구분"
                type="text"
                value={지출구분}
                onChange={(e) => set지출구분(e.target.value)}
                placeholder="예: 장례비용, 음식"
                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-black placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label
                htmlFor="지출금액"
                className="text-sm font-medium text-black"
              >
                금액 (원)
              </label>
              <input
                id="지출금액"
                type="text"
                inputMode="numeric"
                value={
                  지출금액
                    ? (지출금액.startsWith("-") ? "-" : "") +
                      Math.abs(
                        Number(지출금액.replace("-", ""))
                      ).toLocaleString()
                    : ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  const isNegative = val.startsWith("-");
                  const digits = val.replace(/\D/g, "");
                  set지출금액(
                    isNegative && !digits
                      ? "-"
                      : digits
                        ? isNegative
                          ? "-" + digits
                          : digits
                        : ""
                  );
                }}
                placeholder="0"
                className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-black placeholder-stone-400 outline-none transition-colors focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
              />
            </div>
            <button
              type="button"
              onClick={handle지출확인}
              className="shrink-0 rounded-lg bg-stone-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            >
              추가
            </button>
          </div>

          {지출목록.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-stone-300">
                      <th className="pb-2 pr-4 text-left font-medium text-black">
                        구분
                      </th>
                      <th className="pb-2 pr-4 text-right font-medium text-black">
                        금액 (원)
                      </th>
                      {/* <th className="pb-2 w-16 font-medium text-black" /> */}
                    </tr>
                  </thead>
                  <tbody>
                    {지출목록.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-stone-200 last:border-0"
                      >
                        <td className="py-2 pr-4 text-lg text-black">
                          {item.구분}
                        </td>
                        <td className="py-2 pr-4 text-right text-lg text-black">
                          {Number(item.금액).toLocaleString()}원
                        </td>
                        {/* <td className="py-2">
                          <button
                            type="button"
                            onClick={() => 지출삭제(item.id)}
                            className="rounded border border-stone-300 bg-white px-2 py-1 text-xs text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
                          >
                            삭제
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 border-t border-stone-300 pt-4">
                <p className="text-right text-xl font-bold text-black">
                  지출 합계:{" "}
                  {지출목록
                    .reduce((sum, item) => sum + Number(item.금액), 0)
                    .toLocaleString()}
                  원
                </p>
              </div>
            </>
          ) : (
            <p className="py-6 text-center text-sm text-stone-500">
              등록된 지출내역이 없습니다.
            </p>
          )}
        </section>

        {/* 조의금 - 지출 */}
        <section className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
          <div className="space-y-2 text-right">
            <p className="text-xl text-black">
              조의금 합계:{" "}
              {저장목록
                .reduce((sum, item) => sum + Number(item.액수), 0)
                .toLocaleString()}
              원
            </p>
            <p className="text-xl font-bold text-black">
              지출 합계:{" "}
              {지출목록
                .reduce((sum, item) => sum + Number(item.금액), 0)
                .toLocaleString()}
              원
            </p>
            <p className="mt-4 border-t border-stone-300 pt-4 text-xl font-semibold text-black">
              조의금 합계 - 지출 합계:{" "}
              {(
                저장목록.reduce((sum, item) => sum + Number(item.액수), 0) -
                지출목록.reduce((sum, item) => sum + Number(item.금액), 0)
              ).toLocaleString()}
              원
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
