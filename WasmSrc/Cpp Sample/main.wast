(module
  (type (;0;) (func))
  (type (;1;) (func (param i32)))
  (type (;2;) (func (result i32)))
  (type (;3;) (func (param i32 i32 i32) (result i32)))
  (type (;4;) (func (param i32) (result i32)))
  (type (;5;) (func (param i32 i32)))
  (type (;6;) (func (param i32 i32) (result i32)))
  (import "env" "abort" (func (;0;) (type 1)))
  (import "env" "enlargeMemory" (func (;1;) (type 2)))
  (import "env" "getTotalMemory" (func (;2;) (type 2)))
  (import "env" "abortOnCannotGrowMemory" (func (;3;) (type 2)))
  (import "env" "___setErrNo" (func (;4;) (type 1)))
  (import "env" "_emscripten_memcpy_big" (func (;5;) (type 3)))
  (import "env" "__table_base" (global (;0;) i32))
  (import "env" "DYNAMICTOP_PTR" (global (;1;) i32))
  (import "env" "memory" (memory (;0;) 256 256))
  (import "env" "table" (table (;0;) 1 1 anyfunc))
  (func (;6;) (type 4) (param i32) (result i32)
    (local i32)
    global.get 5
    local.set 1
    local.get 0
    global.get 5
    i32.add
    global.set 5
    global.get 5
    i32.const 15
    i32.add
    i32.const -16
    i32.and
    global.set 5
    local.get 1)
  (func (;7;) (type 2) (result i32)
    global.get 5)
  (func (;8;) (type 1) (param i32)
    local.get 0
    global.set 5)
  (func (;9;) (type 5) (param i32 i32)
    local.get 0
    global.set 5
    local.get 1
    global.set 6)
  (func (;10;) (type 5) (param i32 i32)
    global.get 3
    i32.eqz
    if  ;; label = @1
      local.get 0
      global.set 3
      local.get 1
      global.set 4
    end)
  (func (;11;) (type 6) (param i32 i32) (result i32)
    (local i32)
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            local.get 0
            i32.const 24
            i32.shl
            i32.const 24
            i32.shr_s
            br_table 0 (;@4;) 1 (;@3;) 2 (;@2;)
          end
          i32.const 1024
          local.get 1
          i32.const -1
          local.get 1
          i32.const -1
          i32.gt_s
          select
          call 19
          local.tee 0
          i32.store
          i32.const 1028
          local.set 2
          br 2 (;@1;)
        end
        i32.const 1032
        local.get 1
        i32.const -1
        local.get 1
        i32.const -1
        i32.gt_s
        select
        call 19
        local.tee 0
        i32.store
        i32.const 1036
        local.set 2
        br 1 (;@1;)
      end
      i32.const 0
      return
    end
    local.get 2
    local.get 1
    i32.store
    local.get 0)
  (func (;12;) (type 2) (result i32)
    i32.const 1040
    i32.load)
  (func (;13;) (type 2) (result i32)
    i32.const 1028
    i32.load
    i32.const 1036
    i32.load
    i32.add)
  (func (;14;) (type 2) (result i32)
    (local i32 i32 i32)
    i32.const 1028
    i32.load
    local.tee 1
    i32.const 0
    i32.ne
    i32.const 1036
    i32.load
    local.tee 2
    i32.const 0
    i32.ne
    i32.and
    i32.eqz
    if  ;; label = @1
      i32.const 0
      return
    end
    i32.const 1040
    local.get 1
    local.get 2
    i32.add
    local.tee 0
    i32.const -1
    local.get 0
    i32.const -1
    i32.gt_s
    select
    call 19
    local.tee 0
    i32.store
    local.get 0
    i32.const 1024
    i32.load
    local.get 1
    call 21
    drop
    local.get 0
    local.get 1
    i32.add
    i32.const 1032
    i32.load
    local.get 2
    call 21
    drop
    i32.const 1)
  (func (;15;) (type 2) (result i32)
    i32.const 1044)
  (func (;16;) (type 4) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 5
    local.set 10
    global.get 5
    i32.const 16
    i32.add
    global.set 5
    local.get 10
    local.set 9
    local.get 0
    i32.const 245
    i32.lt_u
    if (result i32)  ;; label = @1
      i32.const 1048
      i32.load
      local.tee 5
      i32.const 16
      local.get 0
      i32.const 11
      i32.add
      i32.const -8
      i32.and
      local.get 0
      i32.const 11
      i32.lt_u
      select
      local.tee 2
      i32.const 3
      i32.shr_u
      local.tee 0
      i32.shr_u
      local.tee 1
      i32.const 3
      i32.and
      if  ;; label = @2
        local.get 1
        i32.const 1
        i32.and
        i32.const 1
        i32.xor
        local.get 0
        i32.add
        local.tee 1
        i32.const 3
        i32.shl
        i32.const 1088
        i32.add
        local.tee 2
        i32.const 8
        i32.add
        local.tee 4
        i32.load
        local.tee 3
        i32.const 8
        i32.add
        local.tee 6
        i32.load
        local.set 0
        local.get 0
        local.get 2
        i32.eq
        if  ;; label = @3
          i32.const 1048
          i32.const 1
          local.get 1
          i32.shl
          i32.const -1
          i32.xor
          local.get 5
          i32.and
          i32.store
        else
          local.get 0
          local.get 2
          i32.store offset=12
          local.get 4
          local.get 0
          i32.store
        end
        local.get 3
        local.get 1
        i32.const 3
        i32.shl
        local.tee 0
        i32.const 3
        i32.or
        i32.store offset=4
        local.get 0
        local.get 3
        i32.add
        i32.const 4
        i32.add
        local.tee 0
        local.get 0
        i32.load
        i32.const 1
        i32.or
        i32.store
        local.get 10
        global.set 5
        local.get 6
        return
      end
      local.get 2
      i32.const 1056
      i32.load
      local.tee 7
      i32.gt_u
      if (result i32)  ;; label = @2
        local.get 1
        if  ;; label = @3
          local.get 1
          local.get 0
          i32.shl
          i32.const 2
          local.get 0
          i32.shl
          local.tee 0
          i32.const 0
          local.get 0
          i32.sub
          i32.or
          i32.and
          local.tee 0
          i32.const 0
          local.get 0
          i32.sub
          i32.and
          i32.const -1
          i32.add
          local.tee 0
          i32.const 12
          i32.shr_u
          i32.const 16
          i32.and
          local.tee 1
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 5
          i32.shr_u
          i32.const 8
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 2
          i32.shr_u
          i32.const 4
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 1
          i32.shr_u
          i32.const 2
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 1
          i32.shr_u
          i32.const 1
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          i32.add
          local.tee 3
          i32.const 3
          i32.shl
          i32.const 1088
          i32.add
          local.tee 4
          i32.const 8
          i32.add
          local.tee 6
          i32.load
          local.tee 1
          i32.const 8
          i32.add
          local.tee 8
          i32.load
          local.set 0
          local.get 0
          local.get 4
          i32.eq
          if  ;; label = @4
            i32.const 1048
            i32.const 1
            local.get 3
            i32.shl
            i32.const -1
            i32.xor
            local.get 5
            i32.and
            local.tee 0
            i32.store
          else
            local.get 0
            local.get 4
            i32.store offset=12
            local.get 6
            local.get 0
            i32.store
            local.get 5
            local.set 0
          end
          local.get 1
          local.get 2
          i32.const 3
          i32.or
          i32.store offset=4
          local.get 1
          local.get 2
          i32.add
          local.tee 4
          local.get 3
          i32.const 3
          i32.shl
          local.tee 3
          local.get 2
          i32.sub
          local.tee 5
          i32.const 1
          i32.or
          i32.store offset=4
          local.get 1
          local.get 3
          i32.add
          local.get 5
          i32.store
          local.get 7
          if  ;; label = @4
            i32.const 1068
            i32.load
            local.set 3
            local.get 7
            i32.const 3
            i32.shr_u
            local.tee 2
            i32.const 3
            i32.shl
            i32.const 1088
            i32.add
            local.set 1
            i32.const 1
            local.get 2
            i32.shl
            local.tee 2
            local.get 0
            i32.and
            if (result i32)  ;; label = @5
              local.get 1
              i32.const 8
              i32.add
              local.tee 2
              i32.load
            else
              i32.const 1048
              local.get 0
              local.get 2
              i32.or
              i32.store
              local.get 1
              i32.const 8
              i32.add
              local.set 2
              local.get 1
            end
            local.set 0
            local.get 2
            local.get 3
            i32.store
            local.get 0
            local.get 3
            i32.store offset=12
            local.get 3
            local.get 0
            i32.store offset=8
            local.get 3
            local.get 1
            i32.store offset=12
          end
          i32.const 1056
          local.get 5
          i32.store
          i32.const 1068
          local.get 4
          i32.store
          local.get 10
          global.set 5
          local.get 8
          return
        end
        i32.const 1052
        i32.load
        local.tee 11
        if (result i32)  ;; label = @3
          i32.const 0
          local.get 11
          i32.sub
          local.get 11
          i32.and
          i32.const -1
          i32.add
          local.tee 0
          i32.const 12
          i32.shr_u
          i32.const 16
          i32.and
          local.tee 1
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 5
          i32.shr_u
          i32.const 8
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 2
          i32.shr_u
          i32.const 4
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 1
          i32.shr_u
          i32.const 2
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          local.tee 0
          i32.const 1
          i32.shr_u
          i32.const 1
          i32.and
          local.tee 1
          i32.or
          local.get 0
          local.get 1
          i32.shr_u
          i32.add
          i32.const 2
          i32.shl
          i32.const 1352
          i32.add
          i32.load
          local.tee 3
          local.set 1
          local.get 3
          i32.load offset=4
          i32.const -8
          i32.and
          local.get 2
          i32.sub
          local.set 8
          loop  ;; label = @4
            block  ;; label = @5
              local.get 1
              i32.load offset=16
              local.tee 0
              i32.eqz
              if  ;; label = @6
                local.get 1
                i32.load offset=20
                local.tee 0
                i32.eqz
                br_if 1 (;@5;)
              end
              local.get 0
              local.tee 1
              local.get 3
              local.get 1
              i32.load offset=4
              i32.const -8
              i32.and
              local.get 2
              i32.sub
              local.tee 0
              local.get 8
              i32.lt_u
              local.tee 4
              select
              local.set 3
              local.get 0
              local.get 8
              local.get 4
              select
              local.set 8
              br 1 (;@4;)
            end
          end
          local.get 2
          local.get 3
          i32.add
          local.tee 12
          local.get 3
          i32.gt_u
          if (result i32)  ;; label = @4
            local.get 3
            i32.load offset=24
            local.set 9
            local.get 3
            local.get 3
            i32.load offset=12
            local.tee 0
            i32.eq
            if  ;; label = @5
              block  ;; label = @6
                local.get 3
                i32.const 20
                i32.add
                local.tee 1
                i32.load
                local.tee 0
                i32.eqz
                if  ;; label = @7
                  local.get 3
                  i32.const 16
                  i32.add
                  local.tee 1
                  i32.load
                  local.tee 0
                  i32.eqz
                  if  ;; label = @8
                    i32.const 0
                    local.set 0
                    br 2 (;@6;)
                  end
                end
                loop  ;; label = @7
                  block  ;; label = @8
                    local.get 0
                    i32.const 20
                    i32.add
                    local.tee 4
                    i32.load
                    local.tee 6
                    if (result i32)  ;; label = @9
                      local.get 4
                      local.set 1
                      local.get 6
                    else
                      local.get 0
                      i32.const 16
                      i32.add
                      local.tee 4
                      i32.load
                      local.tee 6
                      i32.eqz
                      br_if 1 (;@8;)
                      local.get 4
                      local.set 1
                      local.get 6
                    end
                    local.set 0
                    br 1 (;@7;)
                  end
                end
                local.get 1
                i32.const 0
                i32.store
              end
            else
              local.get 3
              i32.load offset=8
              local.tee 1
              local.get 0
              i32.store offset=12
              local.get 0
              local.get 1
              i32.store offset=8
            end
            local.get 9
            if  ;; label = @5
              block  ;; label = @6
                local.get 3
                local.get 3
                i32.load offset=28
                local.tee 1
                i32.const 2
                i32.shl
                i32.const 1352
                i32.add
                local.tee 4
                i32.load
                i32.eq
                if  ;; label = @7
                  local.get 4
                  local.get 0
                  i32.store
                  local.get 0
                  i32.eqz
                  if  ;; label = @8
                    i32.const 1052
                    i32.const 1
                    local.get 1
                    i32.shl
                    i32.const -1
                    i32.xor
                    local.get 11
                    i32.and
                    i32.store
                    br 2 (;@6;)
                  end
                else
                  local.get 9
                  i32.const 16
                  i32.add
                  local.tee 1
                  local.get 9
                  i32.const 20
                  i32.add
                  local.get 3
                  local.get 1
                  i32.load
                  i32.eq
                  select
                  local.get 0
                  i32.store
                  local.get 0
                  i32.eqz
                  br_if 1 (;@6;)
                end
                local.get 0
                local.get 9
                i32.store offset=24
                local.get 3
                i32.load offset=16
                local.tee 1
                if  ;; label = @7
                  local.get 0
                  local.get 1
                  i32.store offset=16
                  local.get 1
                  local.get 0
                  i32.store offset=24
                end
                local.get 3
                i32.load offset=20
                local.tee 1
                if  ;; label = @7
                  local.get 0
                  local.get 1
                  i32.store offset=20
                  local.get 1
                  local.get 0
                  i32.store offset=24
                end
              end
            end
            local.get 8
            i32.const 16
            i32.lt_u
            if  ;; label = @5
              local.get 3
              local.get 2
              local.get 8
              i32.add
              local.tee 0
              i32.const 3
              i32.or
              i32.store offset=4
              local.get 0
              local.get 3
              i32.add
              i32.const 4
              i32.add
              local.tee 0
              local.get 0
              i32.load
              i32.const 1
              i32.or
              i32.store
            else
              local.get 3
              local.get 2
              i32.const 3
              i32.or
              i32.store offset=4
              local.get 12
              local.get 8
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 8
              local.get 12
              i32.add
              local.get 8
              i32.store
              local.get 7
              if  ;; label = @6
                i32.const 1068
                i32.load
                local.set 4
                local.get 7
                i32.const 3
                i32.shr_u
                local.tee 1
                i32.const 3
                i32.shl
                i32.const 1088
                i32.add
                local.set 0
                i32.const 1
                local.get 1
                i32.shl
                local.tee 1
                local.get 5
                i32.and
                if (result i32)  ;; label = @7
                  local.get 0
                  i32.const 8
                  i32.add
                  local.tee 2
                  i32.load
                else
                  i32.const 1048
                  local.get 1
                  local.get 5
                  i32.or
                  i32.store
                  local.get 0
                  i32.const 8
                  i32.add
                  local.set 2
                  local.get 0
                end
                local.set 1
                local.get 2
                local.get 4
                i32.store
                local.get 1
                local.get 4
                i32.store offset=12
                local.get 4
                local.get 1
                i32.store offset=8
                local.get 4
                local.get 0
                i32.store offset=12
              end
              i32.const 1056
              local.get 8
              i32.store
              i32.const 1068
              local.get 12
              i32.store
            end
            local.get 10
            global.set 5
            local.get 3
            i32.const 8
            i32.add
            return
          else
            local.get 2
          end
        else
          local.get 2
        end
      else
        local.get 2
      end
    else
      local.get 0
      i32.const -65
      i32.gt_u
      if (result i32)  ;; label = @2
        i32.const -1
      else
        block (result i32)  ;; label = @3
          local.get 0
          i32.const 11
          i32.add
          local.tee 0
          i32.const -8
          i32.and
          local.set 1
          i32.const 1052
          i32.load
          local.tee 5
          if (result i32)  ;; label = @4
            i32.const 0
            local.get 1
            i32.sub
            local.set 3
            block  ;; label = @5
              block  ;; label = @6
                local.get 0
                i32.const 8
                i32.shr_u
                local.tee 0
                if (result i32)  ;; label = @7
                  local.get 1
                  i32.const 16777215
                  i32.gt_u
                  if (result i32)  ;; label = @8
                    i32.const 31
                  else
                    local.get 0
                    local.get 0
                    i32.const 1048320
                    i32.add
                    i32.const 16
                    i32.shr_u
                    i32.const 8
                    i32.and
                    local.tee 2
                    i32.shl
                    local.tee 4
                    i32.const 520192
                    i32.add
                    i32.const 16
                    i32.shr_u
                    i32.const 4
                    i32.and
                    local.set 0
                    i32.const 14
                    local.get 0
                    local.get 2
                    i32.or
                    local.get 4
                    local.get 0
                    i32.shl
                    local.tee 0
                    i32.const 245760
                    i32.add
                    i32.const 16
                    i32.shr_u
                    i32.const 2
                    i32.and
                    local.tee 2
                    i32.or
                    i32.sub
                    local.get 0
                    local.get 2
                    i32.shl
                    i32.const 15
                    i32.shr_u
                    i32.add
                    local.tee 0
                    i32.const 1
                    i32.shl
                    local.get 1
                    local.get 0
                    i32.const 7
                    i32.add
                    i32.shr_u
                    i32.const 1
                    i32.and
                    i32.or
                  end
                else
                  i32.const 0
                end
                local.tee 7
                i32.const 2
                i32.shl
                i32.const 1352
                i32.add
                i32.load
                local.tee 0
                if (result i32)  ;; label = @7
                  i32.const 0
                  local.set 2
                  local.get 1
                  i32.const 0
                  i32.const 25
                  local.get 7
                  i32.const 1
                  i32.shr_u
                  i32.sub
                  local.get 7
                  i32.const 31
                  i32.eq
                  select
                  i32.shl
                  local.set 6
                  i32.const 0
                  local.set 4
                  loop (result i32)  ;; label = @8
                    local.get 0
                    i32.load offset=4
                    i32.const -8
                    i32.and
                    local.get 1
                    i32.sub
                    local.tee 8
                    local.get 3
                    i32.lt_u
                    if  ;; label = @9
                      local.get 8
                      if (result i32)  ;; label = @10
                        local.get 8
                        local.set 3
                        local.get 0
                      else
                        local.get 0
                        local.set 2
                        i32.const 0
                        local.set 6
                        br 4 (;@6;)
                      end
                      local.set 2
                    end
                    local.get 4
                    local.get 0
                    i32.load offset=20
                    local.tee 4
                    local.get 4
                    i32.eqz
                    local.get 4
                    local.get 0
                    i32.const 16
                    i32.add
                    local.get 6
                    i32.const 31
                    i32.shr_u
                    i32.const 2
                    i32.shl
                    i32.add
                    i32.load
                    local.tee 0
                    i32.eq
                    i32.or
                    select
                    local.set 4
                    local.get 6
                    i32.const 1
                    i32.shl
                    local.set 6
                    local.get 0
                    br_if 0 (;@8;)
                    local.get 2
                  end
                else
                  i32.const 0
                  local.set 4
                  i32.const 0
                end
                local.set 0
                local.get 0
                local.get 4
                i32.or
                i32.eqz
                if  ;; label = @7
                  local.get 1
                  local.get 5
                  i32.const 2
                  local.get 7
                  i32.shl
                  local.tee 0
                  i32.const 0
                  local.get 0
                  i32.sub
                  i32.or
                  i32.and
                  local.tee 2
                  i32.eqz
                  br_if 4 (;@3;)
                  drop
                  i32.const 0
                  local.set 0
                  local.get 2
                  i32.const 0
                  local.get 2
                  i32.sub
                  i32.and
                  i32.const -1
                  i32.add
                  local.tee 2
                  i32.const 12
                  i32.shr_u
                  i32.const 16
                  i32.and
                  local.tee 4
                  local.get 2
                  local.get 4
                  i32.shr_u
                  local.tee 2
                  i32.const 5
                  i32.shr_u
                  i32.const 8
                  i32.and
                  local.tee 4
                  i32.or
                  local.get 2
                  local.get 4
                  i32.shr_u
                  local.tee 2
                  i32.const 2
                  i32.shr_u
                  i32.const 4
                  i32.and
                  local.tee 4
                  i32.or
                  local.get 2
                  local.get 4
                  i32.shr_u
                  local.tee 2
                  i32.const 1
                  i32.shr_u
                  i32.const 2
                  i32.and
                  local.tee 4
                  i32.or
                  local.get 2
                  local.get 4
                  i32.shr_u
                  local.tee 2
                  i32.const 1
                  i32.shr_u
                  i32.const 1
                  i32.and
                  local.tee 4
                  i32.or
                  local.get 2
                  local.get 4
                  i32.shr_u
                  i32.add
                  i32.const 2
                  i32.shl
                  i32.const 1352
                  i32.add
                  i32.load
                  local.set 4
                end
                local.get 4
                if (result i32)  ;; label = @7
                  local.get 0
                  local.set 2
                  local.get 3
                  local.set 6
                  local.get 4
                  local.set 0
                  br 1 (;@6;)
                else
                  local.get 0
                end
                local.set 4
                br 1 (;@5;)
              end
              local.get 2
              local.set 3
              local.get 6
              local.set 2
              loop (result i32)  ;; label = @6
                local.get 0
                i32.load offset=4
                i32.const -8
                i32.and
                local.get 1
                i32.sub
                local.tee 6
                local.get 2
                i32.lt_u
                local.set 4
                local.get 6
                local.get 2
                local.get 4
                select
                local.set 2
                local.get 0
                local.get 3
                local.get 4
                select
                local.set 3
                local.get 0
                i32.load offset=16
                local.tee 4
                if (result i32)  ;; label = @7
                  local.get 4
                else
                  local.get 0
                  i32.load offset=20
                end
                local.tee 0
                br_if 0 (;@6;)
                local.get 3
                local.set 4
                local.get 2
              end
              local.set 3
            end
            local.get 4
            if (result i32)  ;; label = @5
              local.get 3
              i32.const 1056
              i32.load
              local.get 1
              i32.sub
              i32.lt_u
              if (result i32)  ;; label = @6
                local.get 1
                local.get 4
                i32.add
                local.tee 7
                local.get 4
                i32.gt_u
                if (result i32)  ;; label = @7
                  local.get 4
                  i32.load offset=24
                  local.set 9
                  local.get 4
                  local.get 4
                  i32.load offset=12
                  local.tee 0
                  i32.eq
                  if  ;; label = @8
                    block  ;; label = @9
                      local.get 4
                      i32.const 20
                      i32.add
                      local.tee 2
                      i32.load
                      local.tee 0
                      i32.eqz
                      if  ;; label = @10
                        local.get 4
                        i32.const 16
                        i32.add
                        local.tee 2
                        i32.load
                        local.tee 0
                        i32.eqz
                        if  ;; label = @11
                          i32.const 0
                          local.set 0
                          br 2 (;@9;)
                        end
                      end
                      loop  ;; label = @10
                        block  ;; label = @11
                          local.get 0
                          i32.const 20
                          i32.add
                          local.tee 6
                          i32.load
                          local.tee 8
                          if (result i32)  ;; label = @12
                            local.get 6
                            local.set 2
                            local.get 8
                          else
                            local.get 0
                            i32.const 16
                            i32.add
                            local.tee 6
                            i32.load
                            local.tee 8
                            i32.eqz
                            br_if 1 (;@11;)
                            local.get 6
                            local.set 2
                            local.get 8
                          end
                          local.set 0
                          br 1 (;@10;)
                        end
                      end
                      local.get 2
                      i32.const 0
                      i32.store
                    end
                  else
                    local.get 4
                    i32.load offset=8
                    local.tee 2
                    local.get 0
                    i32.store offset=12
                    local.get 0
                    local.get 2
                    i32.store offset=8
                  end
                  local.get 9
                  if  ;; label = @8
                    block  ;; label = @9
                      local.get 4
                      local.get 4
                      i32.load offset=28
                      local.tee 2
                      i32.const 2
                      i32.shl
                      i32.const 1352
                      i32.add
                      local.tee 6
                      i32.load
                      i32.eq
                      if  ;; label = @10
                        local.get 6
                        local.get 0
                        i32.store
                        local.get 0
                        i32.eqz
                        if  ;; label = @11
                          i32.const 1052
                          local.get 5
                          i32.const 1
                          local.get 2
                          i32.shl
                          i32.const -1
                          i32.xor
                          i32.and
                          local.tee 0
                          i32.store
                          br 2 (;@9;)
                        end
                      else
                        local.get 9
                        i32.const 16
                        i32.add
                        local.tee 2
                        local.get 9
                        i32.const 20
                        i32.add
                        local.get 4
                        local.get 2
                        i32.load
                        i32.eq
                        select
                        local.get 0
                        i32.store
                        local.get 0
                        i32.eqz
                        if  ;; label = @11
                          local.get 5
                          local.set 0
                          br 2 (;@9;)
                        end
                      end
                      local.get 0
                      local.get 9
                      i32.store offset=24
                      local.get 4
                      i32.load offset=16
                      local.tee 2
                      if  ;; label = @10
                        local.get 0
                        local.get 2
                        i32.store offset=16
                        local.get 2
                        local.get 0
                        i32.store offset=24
                      end
                      local.get 4
                      i32.load offset=20
                      local.tee 2
                      if (result i32)  ;; label = @10
                        local.get 0
                        local.get 2
                        i32.store offset=20
                        local.get 2
                        local.get 0
                        i32.store offset=24
                        local.get 5
                      else
                        local.get 5
                      end
                      local.set 0
                    end
                  else
                    local.get 5
                    local.set 0
                  end
                  local.get 3
                  i32.const 16
                  i32.lt_u
                  if  ;; label = @8
                    local.get 4
                    local.get 1
                    local.get 3
                    i32.add
                    local.tee 0
                    i32.const 3
                    i32.or
                    i32.store offset=4
                    local.get 0
                    local.get 4
                    i32.add
                    i32.const 4
                    i32.add
                    local.tee 0
                    local.get 0
                    i32.load
                    i32.const 1
                    i32.or
                    i32.store
                  else
                    block  ;; label = @9
                      local.get 4
                      local.get 1
                      i32.const 3
                      i32.or
                      i32.store offset=4
                      local.get 7
                      local.get 3
                      i32.const 1
                      i32.or
                      i32.store offset=4
                      local.get 3
                      local.get 7
                      i32.add
                      local.get 3
                      i32.store
                      local.get 3
                      i32.const 3
                      i32.shr_u
                      local.set 1
                      local.get 3
                      i32.const 256
                      i32.lt_u
                      if  ;; label = @10
                        local.get 1
                        i32.const 3
                        i32.shl
                        i32.const 1088
                        i32.add
                        local.set 0
                        i32.const 1048
                        i32.load
                        local.tee 2
                        i32.const 1
                        local.get 1
                        i32.shl
                        local.tee 1
                        i32.and
                        if (result i32)  ;; label = @11
                          local.get 0
                          i32.const 8
                          i32.add
                          local.tee 2
                          i32.load
                        else
                          i32.const 1048
                          local.get 1
                          local.get 2
                          i32.or
                          i32.store
                          local.get 0
                          i32.const 8
                          i32.add
                          local.set 2
                          local.get 0
                        end
                        local.set 1
                        local.get 2
                        local.get 7
                        i32.store
                        local.get 1
                        local.get 7
                        i32.store offset=12
                        local.get 7
                        local.get 1
                        i32.store offset=8
                        local.get 7
                        local.get 0
                        i32.store offset=12
                        br 1 (;@9;)
                      end
                      local.get 3
                      i32.const 8
                      i32.shr_u
                      local.tee 1
                      if (result i32)  ;; label = @10
                        local.get 3
                        i32.const 16777215
                        i32.gt_u
                        if (result i32)  ;; label = @11
                          i32.const 31
                        else
                          local.get 1
                          local.get 1
                          i32.const 1048320
                          i32.add
                          i32.const 16
                          i32.shr_u
                          i32.const 8
                          i32.and
                          local.tee 2
                          i32.shl
                          local.tee 5
                          i32.const 520192
                          i32.add
                          i32.const 16
                          i32.shr_u
                          i32.const 4
                          i32.and
                          local.set 1
                          i32.const 14
                          local.get 1
                          local.get 2
                          i32.or
                          local.get 5
                          local.get 1
                          i32.shl
                          local.tee 1
                          i32.const 245760
                          i32.add
                          i32.const 16
                          i32.shr_u
                          i32.const 2
                          i32.and
                          local.tee 2
                          i32.or
                          i32.sub
                          local.get 1
                          local.get 2
                          i32.shl
                          i32.const 15
                          i32.shr_u
                          i32.add
                          local.tee 1
                          i32.const 1
                          i32.shl
                          local.get 3
                          local.get 1
                          i32.const 7
                          i32.add
                          i32.shr_u
                          i32.const 1
                          i32.and
                          i32.or
                        end
                      else
                        i32.const 0
                      end
                      local.tee 1
                      i32.const 2
                      i32.shl
                      i32.const 1352
                      i32.add
                      local.set 2
                      local.get 7
                      local.get 1
                      i32.store offset=28
                      local.get 7
                      i32.const 16
                      i32.add
                      local.tee 5
                      i32.const 0
                      i32.store offset=4
                      local.get 5
                      i32.const 0
                      i32.store
                      i32.const 1
                      local.get 1
                      i32.shl
                      local.tee 5
                      local.get 0
                      i32.and
                      i32.eqz
                      if  ;; label = @10
                        i32.const 1052
                        local.get 0
                        local.get 5
                        i32.or
                        i32.store
                        local.get 2
                        local.get 7
                        i32.store
                        local.get 7
                        local.get 2
                        i32.store offset=24
                        local.get 7
                        local.get 7
                        i32.store offset=12
                        local.get 7
                        local.get 7
                        i32.store offset=8
                        br 1 (;@9;)
                      end
                      local.get 3
                      local.get 2
                      i32.load
                      local.tee 0
                      i32.load offset=4
                      i32.const -8
                      i32.and
                      i32.eq
                      if  ;; label = @10
                        local.get 0
                        local.set 1
                      else
                        block  ;; label = @11
                          local.get 3
                          i32.const 0
                          i32.const 25
                          local.get 1
                          i32.const 1
                          i32.shr_u
                          i32.sub
                          local.get 1
                          i32.const 31
                          i32.eq
                          select
                          i32.shl
                          local.set 2
                          loop  ;; label = @12
                            local.get 0
                            i32.const 16
                            i32.add
                            local.get 2
                            i32.const 31
                            i32.shr_u
                            i32.const 2
                            i32.shl
                            i32.add
                            local.tee 5
                            i32.load
                            local.tee 1
                            if  ;; label = @13
                              local.get 2
                              i32.const 1
                              i32.shl
                              local.set 2
                              local.get 3
                              local.get 1
                              i32.load offset=4
                              i32.const -8
                              i32.and
                              i32.eq
                              br_if 2 (;@11;)
                              local.get 1
                              local.set 0
                              br 1 (;@12;)
                            end
                          end
                          local.get 5
                          local.get 7
                          i32.store
                          local.get 7
                          local.get 0
                          i32.store offset=24
                          local.get 7
                          local.get 7
                          i32.store offset=12
                          local.get 7
                          local.get 7
                          i32.store offset=8
                          br 2 (;@9;)
                        end
                      end
                      local.get 1
                      i32.const 8
                      i32.add
                      local.tee 0
                      i32.load
                      local.tee 2
                      local.get 7
                      i32.store offset=12
                      local.get 0
                      local.get 7
                      i32.store
                      local.get 7
                      local.get 2
                      i32.store offset=8
                      local.get 7
                      local.get 1
                      i32.store offset=12
                      local.get 7
                      i32.const 0
                      i32.store offset=24
                    end
                  end
                  local.get 10
                  global.set 5
                  local.get 4
                  i32.const 8
                  i32.add
                  return
                else
                  local.get 1
                end
              else
                local.get 1
              end
            else
              local.get 1
            end
          else
            local.get 1
          end
        end
      end
    end
    local.set 0
    i32.const 1056
    i32.load
    local.tee 2
    local.get 0
    i32.ge_u
    if  ;; label = @1
      i32.const 1068
      i32.load
      local.set 1
      local.get 2
      local.get 0
      i32.sub
      local.tee 3
      i32.const 15
      i32.gt_u
      if  ;; label = @2
        i32.const 1068
        local.get 0
        local.get 1
        i32.add
        local.tee 5
        i32.store
        i32.const 1056
        local.get 3
        i32.store
        local.get 5
        local.get 3
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 1
        local.get 2
        i32.add
        local.get 3
        i32.store
        local.get 1
        local.get 0
        i32.const 3
        i32.or
        i32.store offset=4
      else
        i32.const 1056
        i32.const 0
        i32.store
        i32.const 1068
        i32.const 0
        i32.store
        local.get 1
        local.get 2
        i32.const 3
        i32.or
        i32.store offset=4
        local.get 1
        local.get 2
        i32.add
        i32.const 4
        i32.add
        local.tee 0
        local.get 0
        i32.load
        i32.const 1
        i32.or
        i32.store
      end
      local.get 10
      global.set 5
      local.get 1
      i32.const 8
      i32.add
      return
    end
    i32.const 1060
    i32.load
    local.tee 2
    local.get 0
    i32.gt_u
    if  ;; label = @1
      i32.const 1060
      local.get 2
      local.get 0
      i32.sub
      local.tee 2
      i32.store
      i32.const 1072
      local.get 0
      i32.const 1072
      i32.load
      local.tee 1
      i32.add
      local.tee 3
      i32.store
      local.get 3
      local.get 2
      i32.const 1
      i32.or
      i32.store offset=4
      local.get 1
      local.get 0
      i32.const 3
      i32.or
      i32.store offset=4
      local.get 10
      global.set 5
      local.get 1
      i32.const 8
      i32.add
      return
    end
    local.get 0
    i32.const 48
    i32.add
    local.set 4
    local.get 0
    i32.const 47
    i32.add
    local.tee 6
    i32.const 1520
    i32.load
    if (result i32)  ;; label = @1
      i32.const 1528
      i32.load
    else
      i32.const 1528
      i32.const 4096
      i32.store
      i32.const 1524
      i32.const 4096
      i32.store
      i32.const 1532
      i32.const -1
      i32.store
      i32.const 1536
      i32.const -1
      i32.store
      i32.const 1540
      i32.const 0
      i32.store
      i32.const 1492
      i32.const 0
      i32.store
      i32.const 1520
      local.get 9
      i32.const -16
      i32.and
      i32.const 1431655768
      i32.xor
      i32.store
      i32.const 4096
    end
    local.tee 1
    i32.add
    local.tee 8
    i32.const 0
    local.get 1
    i32.sub
    local.tee 9
    i32.and
    local.tee 5
    local.get 0
    i32.le_u
    if  ;; label = @1
      local.get 10
      global.set 5
      i32.const 0
      return
    end
    i32.const 1488
    i32.load
    local.tee 1
    if  ;; label = @1
      local.get 5
      i32.const 1480
      i32.load
      local.tee 3
      i32.add
      local.tee 7
      local.get 3
      i32.le_u
      local.get 7
      local.get 1
      i32.gt_u
      i32.or
      if  ;; label = @2
        local.get 10
        global.set 5
        i32.const 0
        return
      end
    end
    block  ;; label = @1
      block  ;; label = @2
        i32.const 1492
        i32.load
        i32.const 4
        i32.and
        if  ;; label = @3
          i32.const 0
          local.set 2
        else
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                i32.const 1072
                i32.load
                local.tee 1
                i32.eqz
                br_if 0 (;@6;)
                i32.const 1496
                local.set 3
                loop  ;; label = @7
                  block  ;; label = @8
                    local.get 3
                    i32.load
                    local.tee 7
                    local.get 1
                    i32.le_u
                    if  ;; label = @9
                      local.get 7
                      local.get 3
                      i32.load offset=4
                      i32.add
                      local.get 1
                      i32.gt_u
                      br_if 1 (;@8;)
                    end
                    local.get 3
                    i32.load offset=8
                    local.tee 3
                    br_if 1 (;@7;)
                    br 2 (;@6;)
                  end
                end
                local.get 9
                local.get 8
                local.get 2
                i32.sub
                i32.and
                local.tee 2
                i32.const 2147483647
                i32.lt_u
                if  ;; label = @7
                  local.get 2
                  call 23
                  local.tee 1
                  local.get 3
                  i32.load
                  local.get 3
                  i32.load offset=4
                  i32.add
                  i32.eq
                  if  ;; label = @8
                    local.get 1
                    i32.const -1
                    i32.ne
                    br_if 6 (;@2;)
                  else
                    br 3 (;@5;)
                  end
                else
                  i32.const 0
                  local.set 2
                end
                br 2 (;@4;)
              end
              i32.const 0
              call 23
              local.tee 1
              i32.const -1
              i32.eq
              if (result i32)  ;; label = @6
                i32.const 0
              else
                i32.const 1480
                i32.load
                local.tee 8
                local.get 5
                local.get 1
                i32.const 1524
                i32.load
                local.tee 2
                i32.const -1
                i32.add
                local.tee 3
                i32.add
                i32.const 0
                local.get 2
                i32.sub
                i32.and
                local.get 1
                i32.sub
                i32.const 0
                local.get 1
                local.get 3
                i32.and
                select
                i32.add
                local.tee 2
                i32.add
                local.set 3
                local.get 2
                i32.const 2147483647
                i32.lt_u
                local.get 2
                local.get 0
                i32.gt_u
                i32.and
                if (result i32)  ;; label = @7
                  i32.const 1488
                  i32.load
                  local.tee 9
                  if  ;; label = @8
                    local.get 3
                    local.get 8
                    i32.le_u
                    local.get 3
                    local.get 9
                    i32.gt_u
                    i32.or
                    if  ;; label = @9
                      i32.const 0
                      local.set 2
                      br 5 (;@4;)
                    end
                  end
                  local.get 1
                  local.get 2
                  call 23
                  local.tee 3
                  i32.eq
                  br_if 5 (;@2;)
                  local.get 3
                  local.set 1
                  br 2 (;@5;)
                else
                  i32.const 0
                end
              end
              local.set 2
              br 1 (;@4;)
            end
            i32.const 0
            local.get 2
            i32.sub
            local.set 8
            local.get 1
            i32.const -1
            i32.ne
            local.get 2
            i32.const 2147483647
            i32.lt_u
            i32.and
            local.get 4
            local.get 2
            i32.gt_u
            i32.and
            i32.eqz
            if  ;; label = @5
              local.get 1
              i32.const -1
              i32.eq
              if  ;; label = @6
                i32.const 0
                local.set 2
                br 2 (;@4;)
              else
                br 4 (;@2;)
              end
              unreachable
            end
            i32.const 1528
            i32.load
            local.tee 3
            local.get 6
            local.get 2
            i32.sub
            i32.add
            i32.const 0
            local.get 3
            i32.sub
            i32.and
            local.tee 3
            i32.const 2147483647
            i32.ge_u
            br_if 2 (;@2;)
            local.get 3
            call 23
            i32.const -1
            i32.eq
            if (result i32)  ;; label = @5
              local.get 8
              call 23
              drop
              i32.const 0
            else
              local.get 2
              local.get 3
              i32.add
              local.set 2
              br 3 (;@2;)
            end
            local.set 2
          end
          i32.const 1492
          i32.const 1492
          i32.load
          i32.const 4
          i32.or
          i32.store
        end
        local.get 5
        i32.const 2147483647
        i32.lt_u
        if  ;; label = @3
          local.get 5
          call 23
          local.set 1
          i32.const 0
          call 23
          local.tee 3
          local.get 1
          i32.sub
          local.tee 4
          local.get 0
          i32.const 40
          i32.add
          i32.gt_u
          local.set 5
          local.get 4
          local.get 2
          local.get 5
          select
          local.set 2
          local.get 5
          i32.const 1
          i32.xor
          local.get 1
          i32.const -1
          i32.eq
          i32.or
          local.get 1
          i32.const -1
          i32.ne
          local.get 3
          i32.const -1
          i32.ne
          i32.and
          local.get 1
          local.get 3
          i32.lt_u
          i32.and
          i32.const 1
          i32.xor
          i32.or
          i32.eqz
          br_if 1 (;@2;)
        end
        br 1 (;@1;)
      end
      i32.const 1480
      local.get 2
      i32.const 1480
      i32.load
      i32.add
      local.tee 3
      i32.store
      local.get 3
      i32.const 1484
      i32.load
      i32.gt_u
      if  ;; label = @2
        i32.const 1484
        local.get 3
        i32.store
      end
      i32.const 1072
      i32.load
      local.tee 5
      if  ;; label = @2
        block  ;; label = @3
          i32.const 1496
          local.set 3
          block  ;; label = @4
            block  ;; label = @5
              loop  ;; label = @6
                local.get 1
                local.get 3
                i32.load
                local.tee 4
                local.get 3
                i32.load offset=4
                local.tee 6
                i32.add
                i32.eq
                br_if 1 (;@5;)
                local.get 3
                i32.load offset=8
                local.tee 3
                br_if 0 (;@6;)
              end
              br 1 (;@4;)
            end
            local.get 3
            i32.const 4
            i32.add
            local.set 8
            local.get 3
            i32.load offset=12
            i32.const 8
            i32.and
            i32.eqz
            if  ;; label = @5
              local.get 4
              local.get 5
              i32.le_u
              local.get 1
              local.get 5
              i32.gt_u
              i32.and
              if  ;; label = @6
                local.get 8
                local.get 2
                local.get 6
                i32.add
                i32.store
                local.get 5
                i32.const 0
                local.get 5
                i32.const 8
                i32.add
                local.tee 1
                i32.sub
                i32.const 7
                i32.and
                i32.const 0
                local.get 1
                i32.const 7
                i32.and
                select
                local.tee 3
                i32.add
                local.set 1
                local.get 2
                i32.const 1060
                i32.load
                i32.add
                local.tee 4
                local.get 3
                i32.sub
                local.set 2
                i32.const 1072
                local.get 1
                i32.store
                i32.const 1060
                local.get 2
                i32.store
                local.get 1
                local.get 2
                i32.const 1
                i32.or
                i32.store offset=4
                local.get 4
                local.get 5
                i32.add
                i32.const 40
                i32.store offset=4
                i32.const 1076
                i32.const 1536
                i32.load
                i32.store
                br 3 (;@3;)
              end
            end
          end
          local.get 1
          i32.const 1064
          i32.load
          i32.lt_u
          if  ;; label = @4
            i32.const 1064
            local.get 1
            i32.store
          end
          local.get 1
          local.get 2
          i32.add
          local.set 4
          i32.const 1496
          local.set 3
          block  ;; label = @4
            block  ;; label = @5
              loop  ;; label = @6
                local.get 4
                local.get 3
                i32.load
                i32.eq
                br_if 1 (;@5;)
                local.get 3
                i32.load offset=8
                local.tee 3
                br_if 0 (;@6;)
              end
              br 1 (;@4;)
            end
            local.get 3
            i32.load offset=12
            i32.const 8
            i32.and
            i32.eqz
            if  ;; label = @5
              local.get 3
              local.get 1
              i32.store
              local.get 3
              i32.const 4
              i32.add
              local.tee 3
              local.get 2
              local.get 3
              i32.load
              i32.add
              i32.store
              local.get 0
              local.get 1
              i32.const 0
              local.get 1
              i32.const 8
              i32.add
              local.tee 1
              i32.sub
              i32.const 7
              i32.and
              i32.const 0
              local.get 1
              i32.const 7
              i32.and
              select
              i32.add
              local.tee 9
              i32.add
              local.set 6
              local.get 4
              i32.const 0
              local.get 4
              i32.const 8
              i32.add
              local.tee 1
              i32.sub
              i32.const 7
              i32.and
              i32.const 0
              local.get 1
              i32.const 7
              i32.and
              select
              i32.add
              local.tee 2
              local.get 9
              i32.sub
              local.get 0
              i32.sub
              local.set 3
              local.get 9
              local.get 0
              i32.const 3
              i32.or
              i32.store offset=4
              local.get 2
              local.get 5
              i32.eq
              if  ;; label = @6
                i32.const 1060
                local.get 3
                i32.const 1060
                i32.load
                i32.add
                local.tee 0
                i32.store
                i32.const 1072
                local.get 6
                i32.store
                local.get 6
                local.get 0
                i32.const 1
                i32.or
                i32.store offset=4
              else
                block  ;; label = @7
                  local.get 2
                  i32.const 1068
                  i32.load
                  i32.eq
                  if  ;; label = @8
                    i32.const 1056
                    local.get 3
                    i32.const 1056
                    i32.load
                    i32.add
                    local.tee 0
                    i32.store
                    i32.const 1068
                    local.get 6
                    i32.store
                    local.get 6
                    local.get 0
                    i32.const 1
                    i32.or
                    i32.store offset=4
                    local.get 0
                    local.get 6
                    i32.add
                    local.get 0
                    i32.store
                    br 1 (;@7;)
                  end
                  local.get 2
                  i32.load offset=4
                  local.tee 0
                  i32.const 3
                  i32.and
                  i32.const 1
                  i32.eq
                  if  ;; label = @8
                    local.get 0
                    i32.const -8
                    i32.and
                    local.set 7
                    local.get 0
                    i32.const 3
                    i32.shr_u
                    local.set 5
                    local.get 0
                    i32.const 256
                    i32.lt_u
                    if  ;; label = @9
                      local.get 2
                      i32.load offset=8
                      local.tee 0
                      local.get 2
                      i32.load offset=12
                      local.tee 1
                      i32.eq
                      if  ;; label = @10
                        i32.const 1048
                        i32.const 1048
                        i32.load
                        i32.const 1
                        local.get 5
                        i32.shl
                        i32.const -1
                        i32.xor
                        i32.and
                        i32.store
                      else
                        local.get 0
                        local.get 1
                        i32.store offset=12
                        local.get 1
                        local.get 0
                        i32.store offset=8
                      end
                    else
                      block  ;; label = @10
                        local.get 2
                        i32.load offset=24
                        local.set 8
                        local.get 2
                        local.get 2
                        i32.load offset=12
                        local.tee 0
                        i32.eq
                        if  ;; label = @11
                          block  ;; label = @12
                            local.get 2
                            i32.const 16
                            i32.add
                            local.tee 1
                            i32.const 4
                            i32.add
                            local.tee 5
                            i32.load
                            local.tee 0
                            if  ;; label = @13
                              local.get 5
                              local.set 1
                            else
                              local.get 1
                              i32.load
                              local.tee 0
                              i32.eqz
                              if  ;; label = @14
                                i32.const 0
                                local.set 0
                                br 2 (;@12;)
                              end
                            end
                            loop  ;; label = @13
                              block  ;; label = @14
                                local.get 0
                                i32.const 20
                                i32.add
                                local.tee 5
                                i32.load
                                local.tee 4
                                if (result i32)  ;; label = @15
                                  local.get 5
                                  local.set 1
                                  local.get 4
                                else
                                  local.get 0
                                  i32.const 16
                                  i32.add
                                  local.tee 5
                                  i32.load
                                  local.tee 4
                                  i32.eqz
                                  br_if 1 (;@14;)
                                  local.get 5
                                  local.set 1
                                  local.get 4
                                end
                                local.set 0
                                br 1 (;@13;)
                              end
                            end
                            local.get 1
                            i32.const 0
                            i32.store
                          end
                        else
                          local.get 2
                          i32.load offset=8
                          local.tee 1
                          local.get 0
                          i32.store offset=12
                          local.get 0
                          local.get 1
                          i32.store offset=8
                        end
                        local.get 8
                        i32.eqz
                        br_if 0 (;@10;)
                        local.get 2
                        local.get 2
                        i32.load offset=28
                        local.tee 1
                        i32.const 2
                        i32.shl
                        i32.const 1352
                        i32.add
                        local.tee 5
                        i32.load
                        i32.eq
                        if  ;; label = @11
                          block  ;; label = @12
                            local.get 5
                            local.get 0
                            i32.store
                            local.get 0
                            br_if 0 (;@12;)
                            i32.const 1052
                            i32.const 1052
                            i32.load
                            i32.const 1
                            local.get 1
                            i32.shl
                            i32.const -1
                            i32.xor
                            i32.and
                            i32.store
                            br 2 (;@10;)
                          end
                        else
                          local.get 8
                          i32.const 16
                          i32.add
                          local.tee 1
                          local.get 8
                          i32.const 20
                          i32.add
                          local.get 2
                          local.get 1
                          i32.load
                          i32.eq
                          select
                          local.get 0
                          i32.store
                          local.get 0
                          i32.eqz
                          br_if 1 (;@10;)
                        end
                        local.get 0
                        local.get 8
                        i32.store offset=24
                        local.get 2
                        i32.const 16
                        i32.add
                        local.tee 5
                        i32.load
                        local.tee 1
                        if  ;; label = @11
                          local.get 0
                          local.get 1
                          i32.store offset=16
                          local.get 1
                          local.get 0
                          i32.store offset=24
                        end
                        local.get 5
                        i32.load offset=4
                        local.tee 1
                        i32.eqz
                        br_if 0 (;@10;)
                        local.get 0
                        local.get 1
                        i32.store offset=20
                        local.get 1
                        local.get 0
                        i32.store offset=24
                      end
                    end
                    local.get 2
                    local.get 7
                    i32.add
                    local.set 2
                    local.get 3
                    local.get 7
                    i32.add
                    local.set 3
                  end
                  local.get 2
                  i32.const 4
                  i32.add
                  local.tee 0
                  local.get 0
                  i32.load
                  i32.const -2
                  i32.and
                  i32.store
                  local.get 6
                  local.get 3
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 3
                  local.get 6
                  i32.add
                  local.get 3
                  i32.store
                  local.get 3
                  i32.const 3
                  i32.shr_u
                  local.set 1
                  local.get 3
                  i32.const 256
                  i32.lt_u
                  if  ;; label = @8
                    local.get 1
                    i32.const 3
                    i32.shl
                    i32.const 1088
                    i32.add
                    local.set 0
                    i32.const 1048
                    i32.load
                    local.tee 2
                    i32.const 1
                    local.get 1
                    i32.shl
                    local.tee 1
                    i32.and
                    if (result i32)  ;; label = @9
                      local.get 0
                      i32.const 8
                      i32.add
                      local.tee 2
                      i32.load
                    else
                      i32.const 1048
                      local.get 1
                      local.get 2
                      i32.or
                      i32.store
                      local.get 0
                      i32.const 8
                      i32.add
                      local.set 2
                      local.get 0
                    end
                    local.set 1
                    local.get 2
                    local.get 6
                    i32.store
                    local.get 1
                    local.get 6
                    i32.store offset=12
                    local.get 6
                    local.get 1
                    i32.store offset=8
                    local.get 6
                    local.get 0
                    i32.store offset=12
                    br 1 (;@7;)
                  end
                  local.get 3
                  i32.const 8
                  i32.shr_u
                  local.tee 0
                  if (result i32)  ;; label = @8
                    local.get 3
                    i32.const 16777215
                    i32.gt_u
                    if (result i32)  ;; label = @9
                      i32.const 31
                    else
                      local.get 0
                      local.get 0
                      i32.const 1048320
                      i32.add
                      i32.const 16
                      i32.shr_u
                      i32.const 8
                      i32.and
                      local.tee 1
                      i32.shl
                      local.tee 2
                      i32.const 520192
                      i32.add
                      i32.const 16
                      i32.shr_u
                      i32.const 4
                      i32.and
                      local.set 0
                      i32.const 14
                      local.get 0
                      local.get 1
                      i32.or
                      local.get 2
                      local.get 0
                      i32.shl
                      local.tee 0
                      i32.const 245760
                      i32.add
                      i32.const 16
                      i32.shr_u
                      i32.const 2
                      i32.and
                      local.tee 1
                      i32.or
                      i32.sub
                      local.get 0
                      local.get 1
                      i32.shl
                      i32.const 15
                      i32.shr_u
                      i32.add
                      local.tee 0
                      i32.const 1
                      i32.shl
                      local.get 3
                      local.get 0
                      i32.const 7
                      i32.add
                      i32.shr_u
                      i32.const 1
                      i32.and
                      i32.or
                    end
                  else
                    i32.const 0
                  end
                  local.tee 1
                  i32.const 2
                  i32.shl
                  i32.const 1352
                  i32.add
                  local.set 0
                  local.get 6
                  local.get 1
                  i32.store offset=28
                  local.get 6
                  i32.const 16
                  i32.add
                  local.tee 2
                  i32.const 0
                  i32.store offset=4
                  local.get 2
                  i32.const 0
                  i32.store
                  i32.const 1052
                  i32.load
                  local.tee 2
                  i32.const 1
                  local.get 1
                  i32.shl
                  local.tee 5
                  i32.and
                  i32.eqz
                  if  ;; label = @8
                    i32.const 1052
                    local.get 2
                    local.get 5
                    i32.or
                    i32.store
                    local.get 0
                    local.get 6
                    i32.store
                    local.get 6
                    local.get 0
                    i32.store offset=24
                    local.get 6
                    local.get 6
                    i32.store offset=12
                    local.get 6
                    local.get 6
                    i32.store offset=8
                    br 1 (;@7;)
                  end
                  local.get 3
                  local.get 0
                  i32.load
                  local.tee 0
                  i32.load offset=4
                  i32.const -8
                  i32.and
                  i32.eq
                  if  ;; label = @8
                    local.get 0
                    local.set 1
                  else
                    block  ;; label = @9
                      local.get 3
                      i32.const 0
                      i32.const 25
                      local.get 1
                      i32.const 1
                      i32.shr_u
                      i32.sub
                      local.get 1
                      i32.const 31
                      i32.eq
                      select
                      i32.shl
                      local.set 2
                      loop  ;; label = @10
                        local.get 0
                        i32.const 16
                        i32.add
                        local.get 2
                        i32.const 31
                        i32.shr_u
                        i32.const 2
                        i32.shl
                        i32.add
                        local.tee 5
                        i32.load
                        local.tee 1
                        if  ;; label = @11
                          local.get 2
                          i32.const 1
                          i32.shl
                          local.set 2
                          local.get 3
                          local.get 1
                          i32.load offset=4
                          i32.const -8
                          i32.and
                          i32.eq
                          br_if 2 (;@9;)
                          local.get 1
                          local.set 0
                          br 1 (;@10;)
                        end
                      end
                      local.get 5
                      local.get 6
                      i32.store
                      local.get 6
                      local.get 0
                      i32.store offset=24
                      local.get 6
                      local.get 6
                      i32.store offset=12
                      local.get 6
                      local.get 6
                      i32.store offset=8
                      br 2 (;@7;)
                    end
                  end
                  local.get 1
                  i32.const 8
                  i32.add
                  local.tee 0
                  i32.load
                  local.tee 2
                  local.get 6
                  i32.store offset=12
                  local.get 0
                  local.get 6
                  i32.store
                  local.get 6
                  local.get 2
                  i32.store offset=8
                  local.get 6
                  local.get 1
                  i32.store offset=12
                  local.get 6
                  i32.const 0
                  i32.store offset=24
                end
              end
              local.get 10
              global.set 5
              local.get 9
              i32.const 8
              i32.add
              return
            end
          end
          i32.const 1496
          local.set 3
          loop  ;; label = @4
            block  ;; label = @5
              local.get 3
              i32.load
              local.tee 4
              local.get 5
              i32.le_u
              if  ;; label = @6
                local.get 4
                local.get 3
                i32.load offset=4
                i32.add
                local.tee 6
                local.get 5
                i32.gt_u
                br_if 1 (;@5;)
              end
              local.get 3
              i32.load offset=8
              local.set 3
              br 1 (;@4;)
            end
          end
          local.get 6
          i32.const -47
          i32.add
          local.tee 4
          i32.const 8
          i32.add
          local.set 3
          local.get 5
          local.get 4
          i32.const 0
          local.get 3
          i32.sub
          i32.const 7
          i32.and
          i32.const 0
          local.get 3
          i32.const 7
          i32.and
          select
          i32.add
          local.tee 3
          local.get 3
          local.get 5
          i32.const 16
          i32.add
          local.tee 9
          i32.lt_u
          select
          local.tee 3
          i32.const 8
          i32.add
          local.set 4
          i32.const 1072
          local.get 1
          i32.const 0
          local.get 1
          i32.const 8
          i32.add
          local.tee 8
          i32.sub
          i32.const 7
          i32.and
          i32.const 0
          local.get 8
          i32.const 7
          i32.and
          select
          local.tee 8
          i32.add
          local.tee 7
          i32.store
          i32.const 1060
          local.get 2
          i32.const -40
          i32.add
          local.tee 11
          local.get 8
          i32.sub
          local.tee 8
          i32.store
          local.get 7
          local.get 8
          i32.const 1
          i32.or
          i32.store offset=4
          local.get 1
          local.get 11
          i32.add
          i32.const 40
          i32.store offset=4
          i32.const 1076
          i32.const 1536
          i32.load
          i32.store
          local.get 3
          i32.const 4
          i32.add
          local.tee 8
          i32.const 27
          i32.store
          local.get 4
          i32.const 1496
          i64.load align=4
          i64.store align=4
          local.get 4
          i32.const 1504
          i64.load align=4
          i64.store offset=8 align=4
          i32.const 1496
          local.get 1
          i32.store
          i32.const 1500
          local.get 2
          i32.store
          i32.const 1508
          i32.const 0
          i32.store
          i32.const 1504
          local.get 4
          i32.store
          local.get 3
          i32.const 24
          i32.add
          local.set 1
          loop  ;; label = @4
            local.get 1
            i32.const 4
            i32.add
            local.tee 2
            i32.const 7
            i32.store
            local.get 1
            i32.const 8
            i32.add
            local.get 6
            i32.lt_u
            if  ;; label = @5
              local.get 2
              local.set 1
              br 1 (;@4;)
            end
          end
          local.get 3
          local.get 5
          i32.ne
          if  ;; label = @4
            local.get 8
            local.get 8
            i32.load
            i32.const -2
            i32.and
            i32.store
            local.get 5
            local.get 3
            local.get 5
            i32.sub
            local.tee 4
            i32.const 1
            i32.or
            i32.store offset=4
            local.get 3
            local.get 4
            i32.store
            local.get 4
            i32.const 3
            i32.shr_u
            local.set 2
            local.get 4
            i32.const 256
            i32.lt_u
            if  ;; label = @5
              local.get 2
              i32.const 3
              i32.shl
              i32.const 1088
              i32.add
              local.set 1
              i32.const 1048
              i32.load
              local.tee 3
              i32.const 1
              local.get 2
              i32.shl
              local.tee 2
              i32.and
              if (result i32)  ;; label = @6
                local.get 1
                i32.const 8
                i32.add
                local.tee 3
                i32.load
              else
                i32.const 1048
                local.get 2
                local.get 3
                i32.or
                i32.store
                local.get 1
                i32.const 8
                i32.add
                local.set 3
                local.get 1
              end
              local.set 2
              local.get 3
              local.get 5
              i32.store
              local.get 2
              local.get 5
              i32.store offset=12
              local.get 5
              local.get 2
              i32.store offset=8
              local.get 5
              local.get 1
              i32.store offset=12
              br 2 (;@3;)
            end
            local.get 4
            i32.const 8
            i32.shr_u
            local.tee 1
            if (result i32)  ;; label = @5
              local.get 4
              i32.const 16777215
              i32.gt_u
              if (result i32)  ;; label = @6
                i32.const 31
              else
                local.get 1
                local.get 1
                i32.const 1048320
                i32.add
                i32.const 16
                i32.shr_u
                i32.const 8
                i32.and
                local.tee 2
                i32.shl
                local.tee 3
                i32.const 520192
                i32.add
                i32.const 16
                i32.shr_u
                i32.const 4
                i32.and
                local.set 1
                i32.const 14
                local.get 1
                local.get 2
                i32.or
                local.get 3
                local.get 1
                i32.shl
                local.tee 1
                i32.const 245760
                i32.add
                i32.const 16
                i32.shr_u
                i32.const 2
                i32.and
                local.tee 2
                i32.or
                i32.sub
                local.get 1
                local.get 2
                i32.shl
                i32.const 15
                i32.shr_u
                i32.add
                local.tee 1
                i32.const 1
                i32.shl
                local.get 4
                local.get 1
                i32.const 7
                i32.add
                i32.shr_u
                i32.const 1
                i32.and
                i32.or
              end
            else
              i32.const 0
            end
            local.tee 2
            i32.const 2
            i32.shl
            i32.const 1352
            i32.add
            local.set 1
            local.get 5
            local.get 2
            i32.store offset=28
            local.get 5
            i32.const 0
            i32.store offset=20
            local.get 9
            i32.const 0
            i32.store
            i32.const 1052
            i32.load
            local.tee 3
            i32.const 1
            local.get 2
            i32.shl
            local.tee 6
            i32.and
            i32.eqz
            if  ;; label = @5
              i32.const 1052
              local.get 3
              local.get 6
              i32.or
              i32.store
              local.get 1
              local.get 5
              i32.store
              local.get 5
              local.get 1
              i32.store offset=24
              local.get 5
              local.get 5
              i32.store offset=12
              local.get 5
              local.get 5
              i32.store offset=8
              br 2 (;@3;)
            end
            local.get 4
            local.get 1
            i32.load
            local.tee 1
            i32.load offset=4
            i32.const -8
            i32.and
            i32.eq
            if  ;; label = @5
              local.get 1
              local.set 2
            else
              block  ;; label = @6
                local.get 4
                i32.const 0
                i32.const 25
                local.get 2
                i32.const 1
                i32.shr_u
                i32.sub
                local.get 2
                i32.const 31
                i32.eq
                select
                i32.shl
                local.set 3
                loop  ;; label = @7
                  local.get 1
                  i32.const 16
                  i32.add
                  local.get 3
                  i32.const 31
                  i32.shr_u
                  i32.const 2
                  i32.shl
                  i32.add
                  local.tee 6
                  i32.load
                  local.tee 2
                  if  ;; label = @8
                    local.get 3
                    i32.const 1
                    i32.shl
                    local.set 3
                    local.get 4
                    local.get 2
                    i32.load offset=4
                    i32.const -8
                    i32.and
                    i32.eq
                    br_if 2 (;@6;)
                    local.get 2
                    local.set 1
                    br 1 (;@7;)
                  end
                end
                local.get 6
                local.get 5
                i32.store
                local.get 5
                local.get 1
                i32.store offset=24
                local.get 5
                local.get 5
                i32.store offset=12
                local.get 5
                local.get 5
                i32.store offset=8
                br 3 (;@3;)
              end
            end
            local.get 2
            i32.const 8
            i32.add
            local.tee 1
            i32.load
            local.tee 3
            local.get 5
            i32.store offset=12
            local.get 1
            local.get 5
            i32.store
            local.get 5
            local.get 3
            i32.store offset=8
            local.get 5
            local.get 2
            i32.store offset=12
            local.get 5
            i32.const 0
            i32.store offset=24
          end
        end
      else
        i32.const 1064
        i32.load
        local.tee 3
        i32.eqz
        local.get 1
        local.get 3
        i32.lt_u
        i32.or
        if  ;; label = @3
          i32.const 1064
          local.get 1
          i32.store
        end
        i32.const 1496
        local.get 1
        i32.store
        i32.const 1500
        local.get 2
        i32.store
        i32.const 1508
        i32.const 0
        i32.store
        i32.const 1084
        i32.const 1520
        i32.load
        i32.store
        i32.const 1080
        i32.const -1
        i32.store
        i32.const 1100
        i32.const 1088
        i32.store
        i32.const 1096
        i32.const 1088
        i32.store
        i32.const 1108
        i32.const 1096
        i32.store
        i32.const 1104
        i32.const 1096
        i32.store
        i32.const 1116
        i32.const 1104
        i32.store
        i32.const 1112
        i32.const 1104
        i32.store
        i32.const 1124
        i32.const 1112
        i32.store
        i32.const 1120
        i32.const 1112
        i32.store
        i32.const 1132
        i32.const 1120
        i32.store
        i32.const 1128
        i32.const 1120
        i32.store
        i32.const 1140
        i32.const 1128
        i32.store
        i32.const 1136
        i32.const 1128
        i32.store
        i32.const 1148
        i32.const 1136
        i32.store
        i32.const 1144
        i32.const 1136
        i32.store
        i32.const 1156
        i32.const 1144
        i32.store
        i32.const 1152
        i32.const 1144
        i32.store
        i32.const 1164
        i32.const 1152
        i32.store
        i32.const 1160
        i32.const 1152
        i32.store
        i32.const 1172
        i32.const 1160
        i32.store
        i32.const 1168
        i32.const 1160
        i32.store
        i32.const 1180
        i32.const 1168
        i32.store
        i32.const 1176
        i32.const 1168
        i32.store
        i32.const 1188
        i32.const 1176
        i32.store
        i32.const 1184
        i32.const 1176
        i32.store
        i32.const 1196
        i32.const 1184
        i32.store
        i32.const 1192
        i32.const 1184
        i32.store
        i32.const 1204
        i32.const 1192
        i32.store
        i32.const 1200
        i32.const 1192
        i32.store
        i32.const 1212
        i32.const 1200
        i32.store
        i32.const 1208
        i32.const 1200
        i32.store
        i32.const 1220
        i32.const 1208
        i32.store
        i32.const 1216
        i32.const 1208
        i32.store
        i32.const 1228
        i32.const 1216
        i32.store
        i32.const 1224
        i32.const 1216
        i32.store
        i32.const 1236
        i32.const 1224
        i32.store
        i32.const 1232
        i32.const 1224
        i32.store
        i32.const 1244
        i32.const 1232
        i32.store
        i32.const 1240
        i32.const 1232
        i32.store
        i32.const 1252
        i32.const 1240
        i32.store
        i32.const 1248
        i32.const 1240
        i32.store
        i32.const 1260
        i32.const 1248
        i32.store
        i32.const 1256
        i32.const 1248
        i32.store
        i32.const 1268
        i32.const 1256
        i32.store
        i32.const 1264
        i32.const 1256
        i32.store
        i32.const 1276
        i32.const 1264
        i32.store
        i32.const 1272
        i32.const 1264
        i32.store
        i32.const 1284
        i32.const 1272
        i32.store
        i32.const 1280
        i32.const 1272
        i32.store
        i32.const 1292
        i32.const 1280
        i32.store
        i32.const 1288
        i32.const 1280
        i32.store
        i32.const 1300
        i32.const 1288
        i32.store
        i32.const 1296
        i32.const 1288
        i32.store
        i32.const 1308
        i32.const 1296
        i32.store
        i32.const 1304
        i32.const 1296
        i32.store
        i32.const 1316
        i32.const 1304
        i32.store
        i32.const 1312
        i32.const 1304
        i32.store
        i32.const 1324
        i32.const 1312
        i32.store
        i32.const 1320
        i32.const 1312
        i32.store
        i32.const 1332
        i32.const 1320
        i32.store
        i32.const 1328
        i32.const 1320
        i32.store
        i32.const 1340
        i32.const 1328
        i32.store
        i32.const 1336
        i32.const 1328
        i32.store
        i32.const 1348
        i32.const 1336
        i32.store
        i32.const 1344
        i32.const 1336
        i32.store
        i32.const 1072
        local.get 1
        i32.const 0
        local.get 1
        i32.const 8
        i32.add
        local.tee 3
        i32.sub
        i32.const 7
        i32.and
        i32.const 0
        local.get 3
        i32.const 7
        i32.and
        select
        local.tee 3
        i32.add
        local.tee 5
        i32.store
        i32.const 1060
        local.get 2
        i32.const -40
        i32.add
        local.tee 2
        local.get 3
        i32.sub
        local.tee 3
        i32.store
        local.get 5
        local.get 3
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 1
        local.get 2
        i32.add
        i32.const 40
        i32.store offset=4
        i32.const 1076
        i32.const 1536
        i32.load
        i32.store
      end
      i32.const 1060
      i32.load
      local.tee 1
      local.get 0
      i32.gt_u
      if  ;; label = @2
        i32.const 1060
        local.get 1
        local.get 0
        i32.sub
        local.tee 2
        i32.store
        i32.const 1072
        local.get 0
        i32.const 1072
        i32.load
        local.tee 1
        i32.add
        local.tee 3
        i32.store
        local.get 3
        local.get 2
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 1
        local.get 0
        i32.const 3
        i32.or
        i32.store offset=4
        local.get 10
        global.set 5
        local.get 1
        i32.const 8
        i32.add
        return
      end
    end
    call 15
    i32.const 12
    i32.store
    local.get 10
    global.set 5
    i32.const 0)
  (func (;17;) (type 1) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    local.get 0
    i32.eqz
    if  ;; label = @1
      return
    end
    i32.const 1064
    i32.load
    local.set 4
    local.get 0
    i32.const -8
    i32.add
    local.tee 2
    local.get 0
    i32.const -4
    i32.add
    i32.load
    local.tee 3
    i32.const -8
    i32.and
    local.tee 0
    i32.add
    local.set 5
    local.get 3
    i32.const 1
    i32.and
    if (result i32)  ;; label = @1
      local.get 2
    else
      block (result i32)  ;; label = @2
        local.get 2
        i32.load
        local.set 1
        local.get 3
        i32.const 3
        i32.and
        i32.eqz
        if  ;; label = @3
          return
        end
        local.get 0
        local.get 1
        i32.add
        local.set 0
        local.get 2
        local.get 1
        i32.sub
        local.tee 2
        local.get 4
        i32.lt_u
        if  ;; label = @3
          return
        end
        local.get 2
        i32.const 1068
        i32.load
        i32.eq
        if  ;; label = @3
          local.get 2
          local.get 5
          i32.const 4
          i32.add
          local.tee 1
          i32.load
          local.tee 3
          i32.const 3
          i32.and
          i32.const 3
          i32.ne
          br_if 1 (;@2;)
          drop
          i32.const 1056
          local.get 0
          i32.store
          local.get 1
          local.get 3
          i32.const -2
          i32.and
          i32.store
          local.get 2
          local.get 0
          i32.const 1
          i32.or
          i32.store offset=4
          local.get 0
          local.get 2
          i32.add
          local.get 0
          i32.store
          return
        end
        local.get 1
        i32.const 3
        i32.shr_u
        local.set 4
        local.get 1
        i32.const 256
        i32.lt_u
        if  ;; label = @3
          local.get 2
          i32.load offset=8
          local.tee 1
          local.get 2
          i32.load offset=12
          local.tee 3
          i32.eq
          if  ;; label = @4
            i32.const 1048
            i32.const 1048
            i32.load
            i32.const 1
            local.get 4
            i32.shl
            i32.const -1
            i32.xor
            i32.and
            i32.store
            local.get 2
            br 2 (;@2;)
          else
            local.get 1
            local.get 3
            i32.store offset=12
            local.get 3
            local.get 1
            i32.store offset=8
            local.get 2
            br 2 (;@2;)
          end
          unreachable
        end
        local.get 2
        i32.load offset=24
        local.set 7
        local.get 2
        local.get 2
        i32.load offset=12
        local.tee 1
        i32.eq
        if  ;; label = @3
          block  ;; label = @4
            local.get 2
            i32.const 16
            i32.add
            local.tee 3
            i32.const 4
            i32.add
            local.tee 4
            i32.load
            local.tee 1
            if  ;; label = @5
              local.get 4
              local.set 3
            else
              local.get 3
              i32.load
              local.tee 1
              i32.eqz
              if  ;; label = @6
                i32.const 0
                local.set 1
                br 2 (;@4;)
              end
            end
            loop  ;; label = @5
              block  ;; label = @6
                local.get 1
                i32.const 20
                i32.add
                local.tee 4
                i32.load
                local.tee 6
                if (result i32)  ;; label = @7
                  local.get 4
                  local.set 3
                  local.get 6
                else
                  local.get 1
                  i32.const 16
                  i32.add
                  local.tee 4
                  i32.load
                  local.tee 6
                  i32.eqz
                  br_if 1 (;@6;)
                  local.get 4
                  local.set 3
                  local.get 6
                end
                local.set 1
                br 1 (;@5;)
              end
            end
            local.get 3
            i32.const 0
            i32.store
          end
        else
          local.get 2
          i32.load offset=8
          local.tee 3
          local.get 1
          i32.store offset=12
          local.get 1
          local.get 3
          i32.store offset=8
        end
        local.get 7
        if (result i32)  ;; label = @3
          local.get 2
          local.get 2
          i32.load offset=28
          local.tee 3
          i32.const 2
          i32.shl
          i32.const 1352
          i32.add
          local.tee 4
          i32.load
          i32.eq
          if  ;; label = @4
            local.get 4
            local.get 1
            i32.store
            local.get 1
            i32.eqz
            if  ;; label = @5
              i32.const 1052
              i32.const 1052
              i32.load
              i32.const 1
              local.get 3
              i32.shl
              i32.const -1
              i32.xor
              i32.and
              i32.store
              local.get 2
              br 3 (;@2;)
            end
          else
            local.get 7
            i32.const 16
            i32.add
            local.tee 3
            local.get 7
            i32.const 20
            i32.add
            local.get 2
            local.get 3
            i32.load
            i32.eq
            select
            local.get 1
            i32.store
            local.get 2
            local.get 1
            i32.eqz
            br_if 2 (;@2;)
            drop
          end
          local.get 1
          local.get 7
          i32.store offset=24
          local.get 2
          i32.const 16
          i32.add
          local.tee 4
          i32.load
          local.tee 3
          if  ;; label = @4
            local.get 1
            local.get 3
            i32.store offset=16
            local.get 3
            local.get 1
            i32.store offset=24
          end
          local.get 4
          i32.load offset=4
          local.tee 3
          if (result i32)  ;; label = @4
            local.get 1
            local.get 3
            i32.store offset=20
            local.get 3
            local.get 1
            i32.store offset=24
            local.get 2
          else
            local.get 2
          end
        else
          local.get 2
        end
      end
    end
    local.tee 7
    local.get 5
    i32.ge_u
    if  ;; label = @1
      return
    end
    local.get 5
    i32.const 4
    i32.add
    local.tee 3
    i32.load
    local.tee 1
    i32.const 1
    i32.and
    i32.eqz
    if  ;; label = @1
      return
    end
    local.get 1
    i32.const 2
    i32.and
    if  ;; label = @1
      local.get 3
      local.get 1
      i32.const -2
      i32.and
      i32.store
      local.get 2
      local.get 0
      i32.const 1
      i32.or
      i32.store offset=4
      local.get 0
      local.get 7
      i32.add
      local.get 0
      i32.store
      local.get 0
      local.set 3
    else
      local.get 5
      i32.const 1072
      i32.load
      i32.eq
      if  ;; label = @2
        i32.const 1060
        local.get 0
        i32.const 1060
        i32.load
        i32.add
        local.tee 0
        i32.store
        i32.const 1072
        local.get 2
        i32.store
        local.get 2
        local.get 0
        i32.const 1
        i32.or
        i32.store offset=4
        i32.const 1068
        i32.load
        local.get 2
        i32.ne
        if  ;; label = @3
          return
        end
        i32.const 1068
        i32.const 0
        i32.store
        i32.const 1056
        i32.const 0
        i32.store
        return
      end
      i32.const 1068
      i32.load
      local.get 5
      i32.eq
      if  ;; label = @2
        i32.const 1056
        local.get 0
        i32.const 1056
        i32.load
        i32.add
        local.tee 0
        i32.store
        i32.const 1068
        local.get 7
        i32.store
        local.get 2
        local.get 0
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 0
        local.get 7
        i32.add
        local.get 0
        i32.store
        return
      end
      local.get 0
      local.get 1
      i32.const -8
      i32.and
      i32.add
      local.set 3
      local.get 1
      i32.const 3
      i32.shr_u
      local.set 4
      local.get 1
      i32.const 256
      i32.lt_u
      if  ;; label = @2
        local.get 5
        i32.load offset=8
        local.tee 0
        local.get 5
        i32.load offset=12
        local.tee 1
        i32.eq
        if  ;; label = @3
          i32.const 1048
          i32.const 1048
          i32.load
          i32.const 1
          local.get 4
          i32.shl
          i32.const -1
          i32.xor
          i32.and
          i32.store
        else
          local.get 0
          local.get 1
          i32.store offset=12
          local.get 1
          local.get 0
          i32.store offset=8
        end
      else
        block  ;; label = @3
          local.get 5
          i32.load offset=24
          local.set 8
          local.get 5
          i32.load offset=12
          local.tee 0
          local.get 5
          i32.eq
          if  ;; label = @4
            block  ;; label = @5
              local.get 5
              i32.const 16
              i32.add
              local.tee 1
              i32.const 4
              i32.add
              local.tee 4
              i32.load
              local.tee 0
              if  ;; label = @6
                local.get 4
                local.set 1
              else
                local.get 1
                i32.load
                local.tee 0
                i32.eqz
                if  ;; label = @7
                  i32.const 0
                  local.set 0
                  br 2 (;@5;)
                end
              end
              loop  ;; label = @6
                block  ;; label = @7
                  local.get 0
                  i32.const 20
                  i32.add
                  local.tee 4
                  i32.load
                  local.tee 6
                  if (result i32)  ;; label = @8
                    local.get 4
                    local.set 1
                    local.get 6
                  else
                    local.get 0
                    i32.const 16
                    i32.add
                    local.tee 4
                    i32.load
                    local.tee 6
                    i32.eqz
                    br_if 1 (;@7;)
                    local.get 4
                    local.set 1
                    local.get 6
                  end
                  local.set 0
                  br 1 (;@6;)
                end
              end
              local.get 1
              i32.const 0
              i32.store
            end
          else
            local.get 5
            i32.load offset=8
            local.tee 1
            local.get 0
            i32.store offset=12
            local.get 0
            local.get 1
            i32.store offset=8
          end
          local.get 8
          if  ;; label = @4
            local.get 5
            i32.load offset=28
            local.tee 1
            i32.const 2
            i32.shl
            i32.const 1352
            i32.add
            local.tee 4
            i32.load
            local.get 5
            i32.eq
            if  ;; label = @5
              local.get 4
              local.get 0
              i32.store
              local.get 0
              i32.eqz
              if  ;; label = @6
                i32.const 1052
                i32.const 1052
                i32.load
                i32.const 1
                local.get 1
                i32.shl
                i32.const -1
                i32.xor
                i32.and
                i32.store
                br 3 (;@3;)
              end
            else
              local.get 8
              i32.const 16
              i32.add
              local.tee 1
              local.get 8
              i32.const 20
              i32.add
              local.get 1
              i32.load
              local.get 5
              i32.eq
              select
              local.get 0
              i32.store
              local.get 0
              i32.eqz
              br_if 2 (;@3;)
            end
            local.get 0
            local.get 8
            i32.store offset=24
            local.get 5
            i32.const 16
            i32.add
            local.tee 4
            i32.load
            local.tee 1
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.store offset=16
              local.get 1
              local.get 0
              i32.store offset=24
            end
            local.get 4
            i32.load offset=4
            local.tee 1
            if  ;; label = @5
              local.get 0
              local.get 1
              i32.store offset=20
              local.get 1
              local.get 0
              i32.store offset=24
            end
          end
        end
      end
      local.get 2
      local.get 3
      i32.const 1
      i32.or
      i32.store offset=4
      local.get 3
      local.get 7
      i32.add
      local.get 3
      i32.store
      local.get 2
      i32.const 1068
      i32.load
      i32.eq
      if  ;; label = @2
        i32.const 1056
        local.get 3
        i32.store
        return
      end
    end
    local.get 3
    i32.const 3
    i32.shr_u
    local.set 1
    local.get 3
    i32.const 256
    i32.lt_u
    if  ;; label = @1
      local.get 1
      i32.const 3
      i32.shl
      i32.const 1088
      i32.add
      local.set 0
      i32.const 1048
      i32.load
      local.tee 3
      i32.const 1
      local.get 1
      i32.shl
      local.tee 1
      i32.and
      if (result i32)  ;; label = @2
        local.get 0
        i32.const 8
        i32.add
        local.tee 3
        i32.load
      else
        i32.const 1048
        local.get 1
        local.get 3
        i32.or
        i32.store
        local.get 0
        i32.const 8
        i32.add
        local.set 3
        local.get 0
      end
      local.set 1
      local.get 3
      local.get 2
      i32.store
      local.get 1
      local.get 2
      i32.store offset=12
      local.get 2
      local.get 1
      i32.store offset=8
      local.get 2
      local.get 0
      i32.store offset=12
      return
    end
    local.get 3
    i32.const 8
    i32.shr_u
    local.tee 0
    if (result i32)  ;; label = @1
      local.get 3
      i32.const 16777215
      i32.gt_u
      if (result i32)  ;; label = @2
        i32.const 31
      else
        local.get 0
        local.get 0
        i32.const 1048320
        i32.add
        i32.const 16
        i32.shr_u
        i32.const 8
        i32.and
        local.tee 1
        i32.shl
        local.tee 4
        i32.const 520192
        i32.add
        i32.const 16
        i32.shr_u
        i32.const 4
        i32.and
        local.set 0
        i32.const 14
        local.get 0
        local.get 1
        i32.or
        local.get 4
        local.get 0
        i32.shl
        local.tee 0
        i32.const 245760
        i32.add
        i32.const 16
        i32.shr_u
        i32.const 2
        i32.and
        local.tee 1
        i32.or
        i32.sub
        local.get 0
        local.get 1
        i32.shl
        i32.const 15
        i32.shr_u
        i32.add
        local.tee 0
        i32.const 1
        i32.shl
        local.get 3
        local.get 0
        i32.const 7
        i32.add
        i32.shr_u
        i32.const 1
        i32.and
        i32.or
      end
    else
      i32.const 0
    end
    local.tee 1
    i32.const 2
    i32.shl
    i32.const 1352
    i32.add
    local.set 0
    local.get 2
    local.get 1
    i32.store offset=28
    local.get 2
    i32.const 0
    i32.store offset=20
    local.get 2
    i32.const 0
    i32.store offset=16
    i32.const 1052
    i32.load
    local.tee 4
    i32.const 1
    local.get 1
    i32.shl
    local.tee 6
    i32.and
    if  ;; label = @1
      block  ;; label = @2
        local.get 3
        local.get 0
        i32.load
        local.tee 0
        i32.load offset=4
        i32.const -8
        i32.and
        i32.eq
        if  ;; label = @3
          local.get 0
          local.set 1
        else
          block  ;; label = @4
            local.get 3
            i32.const 0
            i32.const 25
            local.get 1
            i32.const 1
            i32.shr_u
            i32.sub
            local.get 1
            i32.const 31
            i32.eq
            select
            i32.shl
            local.set 4
            loop  ;; label = @5
              local.get 0
              i32.const 16
              i32.add
              local.get 4
              i32.const 31
              i32.shr_u
              i32.const 2
              i32.shl
              i32.add
              local.tee 6
              i32.load
              local.tee 1
              if  ;; label = @6
                local.get 4
                i32.const 1
                i32.shl
                local.set 4
                local.get 3
                local.get 1
                i32.load offset=4
                i32.const -8
                i32.and
                i32.eq
                br_if 2 (;@4;)
                local.get 1
                local.set 0
                br 1 (;@5;)
              end
            end
            local.get 6
            local.get 2
            i32.store
            local.get 2
            local.get 0
            i32.store offset=24
            local.get 2
            local.get 2
            i32.store offset=12
            local.get 2
            local.get 2
            i32.store offset=8
            br 2 (;@2;)
          end
        end
        local.get 1
        i32.const 8
        i32.add
        local.tee 0
        i32.load
        local.tee 3
        local.get 2
        i32.store offset=12
        local.get 0
        local.get 2
        i32.store
        local.get 2
        local.get 3
        i32.store offset=8
        local.get 2
        local.get 1
        i32.store offset=12
        local.get 2
        i32.const 0
        i32.store offset=24
      end
    else
      i32.const 1052
      local.get 4
      local.get 6
      i32.or
      i32.store
      local.get 0
      local.get 2
      i32.store
      local.get 2
      local.get 0
      i32.store offset=24
      local.get 2
      local.get 2
      i32.store offset=12
      local.get 2
      local.get 2
      i32.store offset=8
    end
    i32.const 1080
    i32.const 1080
    i32.load
    i32.const -1
    i32.add
    local.tee 0
    i32.store
    local.get 0
    if  ;; label = @1
      return
    end
    i32.const 1504
    local.set 0
    loop  ;; label = @1
      local.get 0
      i32.load
      local.tee 2
      i32.const 8
      i32.add
      local.set 0
      local.get 2
      br_if 0 (;@1;)
    end
    i32.const 1080
    i32.const -1
    i32.store)
  (func (;18;) (type 4) (param i32) (result i32)
    (local i32)
    local.get 0
    i32.const 1
    local.get 0
    select
    local.set 1
    loop  ;; label = @1
      local.get 1
      call 16
      local.tee 0
      i32.eqz
      if  ;; label = @2
        call 20
        if (result i32)  ;; label = @3
          i32.const 0
          call_indirect (type 0)
          br 2 (;@1;)
        else
          i32.const 0
        end
        local.set 0
      end
    end
    local.get 0)
  (func (;19;) (type 4) (param i32) (result i32)
    local.get 0
    call 18)
  (func (;20;) (type 2) (result i32)
    (local i32)
    i32.const 1544
    i32.const 1544
    i32.load
    local.tee 0
    i32.store
    local.get 0)
  (func (;21;) (type 3) (param i32 i32 i32) (result i32)
    (local i32 i32 i32)
    local.get 2
    i32.const 8192
    i32.ge_s
    if  ;; label = @1
      local.get 0
      local.get 1
      local.get 2
      call 5
      return
    end
    local.get 0
    local.set 4
    local.get 0
    local.get 2
    i32.add
    local.set 3
    local.get 0
    i32.const 3
    i32.and
    local.get 1
    i32.const 3
    i32.and
    i32.eq
    if  ;; label = @1
      loop  ;; label = @2
        local.get 0
        i32.const 3
        i32.and
        if  ;; label = @3
          local.get 2
          i32.eqz
          if  ;; label = @4
            local.get 4
            return
          end
          local.get 0
          local.get 1
          i32.load8_s
          i32.store8
          local.get 0
          i32.const 1
          i32.add
          local.set 0
          local.get 1
          i32.const 1
          i32.add
          local.set 1
          local.get 2
          i32.const 1
          i32.sub
          local.set 2
          br 1 (;@2;)
        end
      end
      local.get 3
      i32.const -4
      i32.and
      local.tee 2
      i32.const -64
      i32.add
      local.set 5
      loop  ;; label = @2
        local.get 0
        local.get 5
        i32.le_s
        if  ;; label = @3
          local.get 0
          local.get 1
          i32.load
          i32.store
          local.get 0
          local.get 1
          i32.load offset=4
          i32.store offset=4
          local.get 0
          local.get 1
          i32.load offset=8
          i32.store offset=8
          local.get 0
          local.get 1
          i32.load offset=12
          i32.store offset=12
          local.get 0
          local.get 1
          i32.load offset=16
          i32.store offset=16
          local.get 0
          local.get 1
          i32.load offset=20
          i32.store offset=20
          local.get 0
          local.get 1
          i32.load offset=24
          i32.store offset=24
          local.get 0
          local.get 1
          i32.load offset=28
          i32.store offset=28
          local.get 0
          local.get 1
          i32.load offset=32
          i32.store offset=32
          local.get 0
          local.get 1
          i32.load offset=36
          i32.store offset=36
          local.get 0
          local.get 1
          i32.load offset=40
          i32.store offset=40
          local.get 0
          local.get 1
          i32.load offset=44
          i32.store offset=44
          local.get 0
          local.get 1
          i32.load offset=48
          i32.store offset=48
          local.get 0
          local.get 1
          i32.load offset=52
          i32.store offset=52
          local.get 0
          local.get 1
          i32.load offset=56
          i32.store offset=56
          local.get 0
          local.get 1
          i32.load offset=60
          i32.store offset=60
          local.get 0
          i32.const -64
          i32.sub
          local.set 0
          local.get 1
          i32.const -64
          i32.sub
          local.set 1
          br 1 (;@2;)
        end
      end
      loop  ;; label = @2
        local.get 0
        local.get 2
        i32.lt_s
        if  ;; label = @3
          local.get 0
          local.get 1
          i32.load
          i32.store
          local.get 0
          i32.const 4
          i32.add
          local.set 0
          local.get 1
          i32.const 4
          i32.add
          local.set 1
          br 1 (;@2;)
        end
      end
    else
      local.get 3
      i32.const 4
      i32.sub
      local.set 2
      loop  ;; label = @2
        local.get 0
        local.get 2
        i32.lt_s
        if  ;; label = @3
          local.get 0
          local.get 1
          i32.load8_s
          i32.store8
          local.get 0
          local.get 1
          i32.load8_s offset=1
          i32.store8 offset=1
          local.get 0
          local.get 1
          i32.load8_s offset=2
          i32.store8 offset=2
          local.get 0
          local.get 1
          i32.load8_s offset=3
          i32.store8 offset=3
          local.get 0
          i32.const 4
          i32.add
          local.set 0
          local.get 1
          i32.const 4
          i32.add
          local.set 1
          br 1 (;@2;)
        end
      end
    end
    loop  ;; label = @1
      local.get 0
      local.get 3
      i32.lt_s
      if  ;; label = @2
        local.get 0
        local.get 1
        i32.load8_s
        i32.store8
        local.get 0
        i32.const 1
        i32.add
        local.set 0
        local.get 1
        i32.const 1
        i32.add
        local.set 1
        br 1 (;@1;)
      end
    end
    local.get 4)
  (func (;22;) (type 3) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32)
    local.get 0
    local.get 2
    i32.add
    local.set 4
    local.get 1
    i32.const 255
    i32.and
    local.set 1
    local.get 2
    i32.const 67
    i32.ge_s
    if  ;; label = @1
      loop  ;; label = @2
        local.get 0
        i32.const 3
        i32.and
        if  ;; label = @3
          local.get 0
          local.get 1
          i32.store8
          local.get 0
          i32.const 1
          i32.add
          local.set 0
          br 1 (;@2;)
        end
      end
      local.get 4
      i32.const -4
      i32.and
      local.tee 5
      i32.const -64
      i32.add
      local.set 6
      local.get 1
      i32.const 8
      i32.shl
      local.get 1
      i32.or
      local.get 1
      i32.const 16
      i32.shl
      i32.or
      local.get 1
      i32.const 24
      i32.shl
      i32.or
      local.set 3
      loop  ;; label = @2
        local.get 0
        local.get 6
        i32.le_s
        if  ;; label = @3
          local.get 0
          local.get 3
          i32.store
          local.get 0
          local.get 3
          i32.store offset=4
          local.get 0
          local.get 3
          i32.store offset=8
          local.get 0
          local.get 3
          i32.store offset=12
          local.get 0
          local.get 3
          i32.store offset=16
          local.get 0
          local.get 3
          i32.store offset=20
          local.get 0
          local.get 3
          i32.store offset=24
          local.get 0
          local.get 3
          i32.store offset=28
          local.get 0
          local.get 3
          i32.store offset=32
          local.get 0
          local.get 3
          i32.store offset=36
          local.get 0
          local.get 3
          i32.store offset=40
          local.get 0
          local.get 3
          i32.store offset=44
          local.get 0
          local.get 3
          i32.store offset=48
          local.get 0
          local.get 3
          i32.store offset=52
          local.get 0
          local.get 3
          i32.store offset=56
          local.get 0
          local.get 3
          i32.store offset=60
          local.get 0
          i32.const -64
          i32.sub
          local.set 0
          br 1 (;@2;)
        end
      end
      loop  ;; label = @2
        local.get 0
        local.get 5
        i32.lt_s
        if  ;; label = @3
          local.get 0
          local.get 3
          i32.store
          local.get 0
          i32.const 4
          i32.add
          local.set 0
          br 1 (;@2;)
        end
      end
    end
    loop  ;; label = @1
      local.get 0
      local.get 4
      i32.lt_s
      if  ;; label = @2
        local.get 0
        local.get 1
        i32.store8
        local.get 0
        i32.const 1
        i32.add
        local.set 0
        br 1 (;@1;)
      end
    end
    local.get 4
    local.get 2
    i32.sub)
  (func (;23;) (type 4) (param i32) (result i32)
    (local i32 i32)
    local.get 0
    global.get 2
    i32.load
    local.tee 1
    i32.add
    local.tee 2
    local.get 1
    i32.lt_s
    local.get 0
    i32.const 0
    i32.gt_s
    i32.and
    local.get 2
    i32.const 0
    i32.lt_s
    i32.or
    if  ;; label = @1
      call 3
      drop
      i32.const 12
      call 4
      i32.const -1
      return
    end
    global.get 2
    local.get 2
    i32.store
    local.get 2
    call 2
    i32.gt_s
    if  ;; label = @1
      call 1
      i32.eqz
      if  ;; label = @2
        global.get 2
        local.get 1
        i32.store
        i32.const 12
        call 4
        i32.const -1
        return
      end
    end
    local.get 1)
  (func (;24;) (type 1) (param i32)
    i32.const 0
    call_indirect (type 0))
  (func (;25;) (type 0)
    i32.const 0
    call 0)
  (global (;2;) (mut i32) (global.get 1))
  (global (;3;) (mut i32) (i32.const 0))
  (global (;4;) (mut i32) (i32.const 0))
  (global (;5;) (mut i32) (i32.const 2832))
  (global (;6;) (mut i32) (i32.const 5245712))
  (export "___errno_location" (func 15))
  (export "_exec" (func 14))
  (export "_free" (func 17))
  (export "_get_result" (func 12))
  (export "_get_result_size" (func 13))
  (export "_malloc" (func 16))
  (export "_memcpy" (func 21))
  (export "_memset" (func 22))
  (export "_sbrk" (func 23))
  (export "_set_arg" (func 11))
  (export "dynCall_v" (func 24))
  (export "establishStackSpace" (func 9))
  (export "setThrew" (func 10))
  (export "stackAlloc" (func 6))
  (export "stackRestore" (func 8))
  (export "stackSave" (func 7))
  (elem (;0;) (global.get 0) 25))
