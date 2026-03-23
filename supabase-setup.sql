-- Supabase SQL Editor에서 이 스크립트를 실행하세요.
-- Table Editor > New query 에서 실행 가능합니다.

CREATE TABLE IF NOT EXISTS condolence_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  상주이름 TEXT NOT NULL,
  지인이름 TEXT NOT NULL,
  액수 TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 모든 클라이언트에서 읽기/쓰기 허용 (실제 서비스에서는 Row Level Security 설정 권장)
ALTER TABLE condolence_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access" ON condolence_entries
  FOR ALL USING (true) WITH CHECK (true);
