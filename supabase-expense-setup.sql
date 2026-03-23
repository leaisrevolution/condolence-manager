-- Supabase SQL Editor에서 이 스크립트를 실행하세요.
-- Table Editor > New query 에서 실행 가능합니다.

CREATE TABLE IF NOT EXISTS expense_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  구분 TEXT NOT NULL,
  금액 TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE expense_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access" ON expense_entries;
CREATE POLICY "Allow all access" ON expense_entries
  FOR ALL USING (true) WITH CHECK (true);
